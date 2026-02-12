import { useState, useCallback, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

const PersonalDetailsSection = dynamic(() => import('./PersonalDetailsSection').then(mod => mod.PersonalDetailsSection), { ssr: false });
const FamilyMembersSection = dynamic(() => import('./FamilyMembersSection').then(mod => mod.FamilyMembersSection), { ssr: false });
const OccupationMedicalSection = dynamic(() => import('./OccupationMedicalSection').then(mod => mod.OccupationMedicalSection), { ssr: false });
const PolicyDetailsSection = dynamic(() => import('./PolicyDetailsSection').then(mod => mod.PolicyDetailsSection), { ssr: false });
const FormReviewStep = dynamic(() => import('./FormReviewStep').then(mod => mod.FormReviewStep), { ssr: false });
import { Plus, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { customerSchema, jobSchema, medicalSchema, policySchema } from '@/lib/validations';
import { useAuthContext } from '@/context/AuthContext';
import { apiService } from '@/lib/api-service';
import { useToast } from '@/hooks/use-toast';
import { PdfUploadArea } from './PdfUploadArea';

const STEPS_COUNT = 5;

const STORAGE_KEY = 'lic_add_customer_form';

export default function AddCustomerForm({ onSubmit, onCancel, isProcessing, initialData = null }) {
    const { token } = useAuthContext();
    const { toast } = useToast();
    const isEdit = !!initialData;
    const [selectedFile, setSelectedFile] = useState(null);

    // Helper to load draft data for lazy initialization
    const getDraft = (key, defaultVal) => {
        if (isEdit || typeof window === 'undefined') return defaultVal;

        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                return parsed[key] !== undefined ? parsed[key] : defaultVal;
            }
        } catch (e) {
            console.error('Error loading draft', e);
        }
        return defaultVal;
    };

    const [isCheckingMobile, setIsCheckingMobile] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isExtracting, setIsExtracting] = useState(false);
    const [currentStep, setCurrentStep] = useState(() => getDraft('currentStep', 1));
    const [customerForm, setCustomerForm] = useState(() => getDraft('customerForm', {
        customer_name: '', father_name: '', mother_name: '', spouse_name: '',
        spouse_relation: '', age: '', dob: '', address: '', village: '', pincode: '',
        mobile_number: '', email: '', aadhaar_number: '', pan_number: '',
        profile_picture: '', gender: ''
    }));

    const [jobForm, setJobForm] = useState(() => getDraft('jobForm', { type: 'Job', address: '', annual_income: '' }));
    const [medicalForm, setMedicalForm] = useState(() => getDraft('medicalForm', { height: '', weight: '' }));
    const [policyForm, setPolicyForm] = useState(() => getDraft('policyForm', {
        policy_type: '',
        name: '',
        policy_no: '',
        insurance_rate: '8.5',
        insurance_number: `LIC${Date.now()}`,
        premium_year: '20',
        maturity_years: '',
        installment_type: 'Monthly',
        installment_price: '',
        birth_place: '',
        nominee: {
            nominee_name: '',
            relation: '',
            age: '',
            pan_number: ''
        }
    }));

    const [familyMembers, setFamilyMembers] = useState(() => getDraft('familyMembers', []));
    const [formErrors, setFormErrors] = useState({});

    // Guard to prevent overwriting with initial state during the very first render cycle
    const isReadyToSave = useRef(false);

    // Enable saving after the first render
    useEffect(() => {
        isReadyToSave.current = true;
    }, []);

    // Save data on changes
    useEffect(() => {
        if (isEdit || !isReadyToSave.current) return;

        const dataToSave = {
            customerForm,
            jobForm,
            medicalForm,
            policyForm,
            familyMembers,
            currentStep,
            timestamp: Date.now()
        };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }, [customerForm, jobForm, medicalForm, policyForm, familyMembers, currentStep, isEdit]);

    // Populate form data if in edit mode
    useEffect(() => {
        if (initialData && initialData.policies && initialData.policies[0]) {
            const firstPolicy = initialData.policies[0];
            setCustomerForm({
                ...initialData.customer,
                age: initialData.customer?.age || '',
                spouse_relation: initialData.customer?.spouse_relation || '',
                profile_picture:
                    initialData.customer?.profile_picture ||
                    initialData.customer?.profile_photo ||
                    initialData?.profile_picture ||
                    initialData?.profile_photo ||
                    ''
            });
            setJobForm({
                ...initialData.job_business,
                annual_income: initialData.job_business?.annual_income?.toString() || ''
            });
            setMedicalForm({
                height: initialData.medical?.height?.toString() || '',
                weight: initialData.medical?.weight?.toString() || ''
            });
            setPolicyForm({
                policy_type: firstPolicy.policy_type || '',
                name: firstPolicy.name || '',
                policy_no: firstPolicy.policy_no?.toString() || '',
                insurance_rate: firstPolicy.insurance_rate?.toString() || '8.5',
                insurance_number: firstPolicy.insurance_number || '',
                premium_year: firstPolicy.premium_year?.toString() || '20',
                maturity_years: firstPolicy.maturity_years?.toString() || '',
                installment_type: firstPolicy.installment_type || 'Monthly',
                installment_price: firstPolicy.installment_price?.toString() || '',
                birth_place: firstPolicy.birth_place || '',
                nominee: {
                    nominee_name: firstPolicy.nominee?.nominee_name || '',
                    relation: firstPolicy.nominee?.relation || '',
                    age: firstPolicy.nominee?.age?.toString() || '',
                    pan_number: firstPolicy.nominee?.pan_number || ''
                }
            });
            setFamilyMembers((initialData.family_members || []).map(m => ({
                fullName: m.name, dateOfBirth: m.dob, age: m.age?.toString() || ''
            })));
        }
    }, [initialData]);

    const handleFormChange = (setter) => (field, value) => {
        setter(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing again
        if (formErrors[field] || (field === 'nominee')) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                if (field === 'nominee') {
                    // Clear all nominee related errors if the nominee object changes
                    Object.keys(newErrors).forEach(key => {
                        if (key.startsWith('nominee_')) delete newErrors[key];
                    });
                } else {
                    delete newErrors[field];
                }
                return newErrors;
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Store file locally to pass to update logic later
        setSelectedFile(file);

        // Preview immediate
        const reader = new FileReader();
        reader.onloadend = () => handleFormChange(setCustomerForm)('profile_picture', reader.result);
        reader.readAsDataURL(file);
    };

    const handlePdfExtract = async (file) => {
        if (!file || !token) return;

        setIsExtracting(true);
        console.log('🚀 Starting PDF extraction for:', file.name);

        const formatDateForInput = (dateStr) => {
            if (!dateStr) return '';
            try {
                // Handle DD/MM/YYYY or DD-MM-YYYY
                if (dateStr.includes('/') || (dateStr.includes('-') && dateStr.split('-')[0].length < 4)) {
                    const parts = dateStr.split(/[\/\-]/);
                    if (parts.length === 3) {
                        const day = parts[0].padStart(2, '0');
                        const month = parts[1].padStart(2, '0');
                        const year = parts[2];
                        return `${year}-${month}-${day}`;
                    }
                }
                const date = new Date(dateStr);
                if (!isNaN(date.getTime())) {
                    return date.toISOString().split('T')[0];
                }
            } catch (e) {
                console.warn('Date parsing failed for:', dateStr);
            }
            return dateStr;
        };

        try {
            const response = await apiService.uploadPdfAndExtract(file, token);
            console.log('✅ Raw Extracted Response:', response);

            // The user's log confirms data is inside response.extracted_data
            const data = response.extracted_data || response;

            // CHECK FOR BACKEND WORKFLOW ERRORS
            // The backend might return 200 OK but with a body indicating the n8n workflow is down.
            // Example: {code: 404, message: "The requested webhook ... is not registered." }
            if (data.code === 404 || (data.message && data.message.includes('not registered'))) {
                console.error("❌ Backend Workflow Logic Error:", data);
                toast({
                    title: "Server Configuration Error",
                    description: "The AI extraction workflow is not active on the server. Please contact the administrator.",
                    variant: "destructive",
                });
                return;
            }

            if (data && response.success !== false) {
                // 1. Map Customer Details
                const cust = data.customer || data;
                if (cust) {
                    console.log('📝 Mapping Customer Form...', cust);
                    setCustomerForm(prev => {
                        const next = {
                            ...prev,
                            // Handle snake_case, camelCase, and variations
                            customer_name: (cust.customer_name || cust.name || cust.fullName || cust.full_name || prev.customer_name || '').toString(),
                            father_name: (cust.father_name || cust.fatherName || cust.father_s_name || prev.father_name || '').toString(),
                            mother_name: (cust.mother_name || cust.motherName || prev.mother_name || '').toString(),
                            spouse_name: (cust.spouse_name || cust.spouseName || prev.spouse_name || '').toString(),
                            spouse_relation: (cust.spouse_relation || cust.spouseRelation || prev.spouse_relation || '').toString(),
                            dob: formatDateForInput(cust.dob || cust.date_of_birth || cust.birthDate || prev.dob),
                            address: (cust.address || cust.residential_address || cust.permanent_address || prev.address || '').toString(),
                            mobile_number: (cust.mobile_number || cust.phone || cust.contact_number || cust.mobile || prev.mobile_number || '').toString(),
                            aadhaar_number: (cust.aadhaar_number || cust.aadhaar || cust.uid || prev.aadhaar_number || '').toString(),
                            pan_number: (cust.pan_number || cust.pan || cust.panNo || prev.pan_number || '').toString().toUpperCase(),
                            gender: (cust.gender || cust.sex || prev.gender || 'Male').toString(), // Default or existing
                            email: (cust.email || cust.email_id || prev.email || '').toString(),
                            village: (cust.village || cust.city || cust.town || prev.village || '').toString(),
                            pincode: (cust.pincode || cust.pin_code || cust.zip || prev.pincode || '').toString(),

                            // CRITICAL: age MUST be a number for customerSchema validation
                            age: cust.age ? parseInt(cust.age) : (prev.age ? parseInt(prev.age) : '')
                        };
                        console.log('   -> Next Customer State:', next);
                        return next;
                    });
                }

                // 2. Map Job/Business Details
                const job = data.job_business || data.job || data.occupation;
                if (job) {
                    console.log('💼 Mapping Job Form...', job);
                    setJobForm(prev => {
                        const next = {
                            ...prev,
                            type: (job.type || job.occupation || job.jobType || prev.type || 'Job').toString(),
                            address: (job.address || job.office_address || job.work_address || prev.address || '').toString(),
                            annual_income: (job.annual_income || job.income || job.salary || prev.annual_income || '').toString()
                        };
                        return next;
                    });
                }

                // 3. Map Medical Details
                const medical = data.medical || data.health;
                if (medical) {
                    console.log('🏥 Mapping Medical Form...', medical);
                    setMedicalForm(prev => {
                        const next = {
                            ...prev,
                            height: (medical.height || prev.height || '').toString(),
                            weight: (medical.weight || prev.weight || '').toString()
                        };
                        return next;
                    });
                }

                // 4. Map Family Members
                const fMembers = data.family_members || data.family || data.dependents;
                if (fMembers && Array.isArray(fMembers)) {
                    console.log('👨‍👩‍👧‍👦 Mapping Family Members...', fMembers);
                    setFamilyMembers(fMembers.map(m => ({
                        fullName: (m.name || m.fullName || m.customer_name || '').toString(),
                        dateOfBirth: formatDateForInput(m.dob || m.date_of_birth || m.birthDate || ''),
                        age: (m.age || '').toString(),
                        relation: (m.relation || m.relationship || '').toString() // If applicable
                    })));
                }

                // 5. Map Policy Details
                // Handle both single object or array of policies
                let policies = [];
                if (data.policies && Array.isArray(data.policies)) policies = data.policies;
                else if (data.policy) policies = [data.policy];
                else if (data.policy_no) policies = [data]; // If data IS the policy

                const policy = policies.length > 0 ? policies[0] : null;

                if (policy) {
                    console.log('📄 Mapping Policy Form...', policy);
                    setPolicyForm(prev => {
                        const next = {
                            ...prev,
                            policy_no: (policy.policy_no || policy.policyNo || policy.policyNumber || prev.policy_no || '').toString(),
                            insurance_number: (policy.insurance_number || policy.insuranceNo || policy.id || prev.insurance_number || '').toString(),
                            name: (policy.name || policy.customer_name || policy.proposer_name || cust?.customer_name || prev.name || '').toString(),
                            policy_type: (policy.policy_type || policy.type || prev.policy_type || 'self').toString(),

                            // Numeric fields
                            installment_price: policy.installment_price || policy.premium_amount || policy.premium || prev.installment_price || '',
                            insurance_rate: policy.insurance_rate || policy.sum_assured || policy.sumAssured || prev.insurance_rate || '',
                            premium_year: policy.premium_year || policy.term || policy.policy_term || prev.premium_year || '',
                            maturity_years: policy.maturity_years || policy.maturity || policy.maturity_term || prev.maturity_years || '',

                            // Dates & Place
                            birth_place: (policy.birth_place || policy.birthPlace || prev.birth_place || '').toString(),
                            commencement_date: formatDateForInput(policy.commencement_date || policy.policy_date || policy.date_of_commencement || prev.commencement_date),
                            table_number: (policy.table_number || policy.plan_number || policy.plan || prev.table_number || '').toString(),

                            // Nominee
                            nominee: {
                                nominee_name: (policy.nominee?.nominee_name || policy.nominee?.name || policy.nomineeName || prev.nominee.nominee_name || '').toString(),
                                relation: (policy.nominee?.relation || policy.nominee?.relationship || prev.nominee.relation || '').toString(),
                                age: (policy.nominee?.age || prev.nominee.age || '').toString(),
                                pan_number: (policy.nominee?.pan_number || policy.nominee?.pan || prev.nominee.pan_number || '').toString().toUpperCase()
                            }
                        };
                        console.log('   -> Next Policy State:', next);
                        return next;
                    });
                }

                // After mapping everything, run a quick validation check internally to see what's missing
                setTimeout(() => {
                    console.log('🔍 Running internal validation check for Step 1...');
                    const isValid = validateStep(1);
                    if (!isValid) {
                        console.warn('⚠️ Step 1 validation failed after magic fill. Mandatory fields like Gender or Father Name might be missing or invalid.');
                        toast({
                            title: "Forms Filled with Gaps",
                            description: "Some required fields were missing from the PDF. Please check highlighted errors.",
                            variant: "default",
                        });
                    }
                }, 800);

                toast({
                    title: "Magic Fill Complete! ✨",
                    description: "Data has been automatically extracted and populated into the form.",
                    variant: "default",
                });
            }
        } catch (error) {
            console.error("❌ PDF extraction failed:", error);
            toast({
                title: "Extraction Failed",
                description: "Could not extract data from this PDF. Please verify the file and try again.",
                variant: "destructive",
            });
        } finally {
            setIsExtracting(false);
        }
    };

    const validateStep = (step) => {
        let errors = { ...formErrors }; // Carry over manually set errors like duplicate mobile
        const stepErrors = {};
        let isValid = true;

        if (step === 1) {
            const customerVal = customerSchema.safeParse(customerForm);
            if (!customerVal.success) {
                customerVal.error.issues.forEach(i => stepErrors[i.path[0]] = i.message);
                isValid = false;
            }
        } else if (step === 2) {
            const jobVal = jobSchema.safeParse(jobForm);
            if (!jobVal.success) {
                jobVal.error.issues.forEach(i => stepErrors[i.path[0] === 'address' ? 'job_address' : i.path[0]] = i.message);
                isValid = false;
            }
        } else if (step === 4) {
            const policyVal = policySchema.safeParse(policyForm);
            if (!policyVal.success) {
                policyVal.error.issues.forEach(i => {
                    // Handle nested nominee errors and map to UI keys
                    if (i.path[0] === 'nominee' && i.path[1]) {
                        const subPath = i.path[1];
                        const keyMap = {
                            'nominee_name': 'nominee_name',
                            'relation': 'nominee_relation',
                            'age': 'nominee_age',
                            'pan_number': 'nominee_pan'
                        };
                        stepErrors[keyMap[subPath] || `nominee_${subPath}`] = i.message;
                    } else {
                        stepErrors[i.path[0]] = i.message;
                    }
                });
                isValid = false;
            }
        }

        // Merge step errors but preserve mobile_number duplicate error if it exists
        const finalErrors = { ...stepErrors };
        if (errors.mobile_number && !stepErrors.mobile_number) {
            // Keep the duplicate error only if the schema validation didn't find its own error
            finalErrors.mobile_number = errors.mobile_number;
            isValid = false;
        }

        setFormErrors(finalErrors);
        return isValid && Object.keys(finalErrors).length === 0;
    };

    const handleNext = () => {
        if (isCheckingMobile) {
            toast({
                title: "Checking Availability",
                description: "Please wait while we verify the mobile number.",
                variant: "default",
            });
            return;
        }

        if (validateStep(currentStep)) {
            if (currentStep < STEPS_COUNT) {
                setCurrentStep(prev => prev + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                handleFinalSubmit();
            }
        } else {
            // Scroll to the first error message with better mobile handling
            setTimeout(() => {
                const firstError = document.querySelector('.text-destructive');
                if (firstError) {
                    const yOffset = -100; // Account for header
                    const y = firstError.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            onCancel();
        }
    };

    const handleFinalSubmit = () => {
        const payload = {
            customer: {
                customer_name: customerForm.customer_name,
                father_name: customerForm.father_name,
                mother_name: customerForm.mother_name,
                spouse_name: customerForm.spouse_name,
                spouse_relation: customerForm.spouse_relation,
                dob: customerForm.dob,
                address: customerForm.address,
                village: customerForm.village,
                pincode: customerForm.pincode,
                mobile_number: customerForm.mobile_number,
                email: customerForm.email,
                aadhaar_number: customerForm.aadhaar_number,
                pan_number: customerForm.pan_number,
                age: customerForm.age ? parseInt(customerForm.age) : null,
                profile_picture: customerForm.profile_picture,
                profile_photo: customerForm.profile_picture,
                profilePicture: customerForm.profile_picture,
                photo: customerForm.profile_picture,
                avatar: customerForm.profile_picture
            },
            job_business: { ...jobForm, annual_income: parseFloat(jobForm.annual_income) || 0 },
            medical: { height: parseFloat(medicalForm.height) || 0, weight: parseFloat(medicalForm.weight) || 0 },
            family_members: familyMembers.map(m => ({
                name: m.fullName,
                age: parseInt(m.age) || null,
                dob: m.dateOfBirth || null,
                is_deceased: false,
                age_at_death: null,
                reason_of_death: null
            })),
            policies: [{
                policy_type: policyForm.policy_type,
                name: policyForm.name,
                policy_no: parseInt(policyForm.policy_no) || 0,
                insurance_number: policyForm.insurance_number,
                insurance_rate: parseFloat(policyForm.insurance_rate),
                premium_year: parseInt(policyForm.premium_year),
                maturity_years: parseInt(policyForm.maturity_years),
                installment_type: policyForm.installment_type,
                installment_price: parseFloat(policyForm.installment_price),
                birth_place: policyForm.birth_place,
                dob: null,
                age: null,
                aadhaar_number: null,
                policy_date: null,
                policy_amount: null,
                nominee: {
                    nominee_name: policyForm.nominee.nominee_name,
                    relation: policyForm.nominee.relation,
                    age: parseInt(policyForm.nominee.age) || 0,
                    pan_number: policyForm.nominee.pan_number
                }
            }]
        };

        // Add profile picture to root as well for resilience
        if (customerForm.profile_picture) {
            payload.profile_picture = customerForm.profile_picture;
            payload.profile_photo = customerForm.profile_picture;
        }

        // Clear persistence storage on successful final submission
        if (!isEdit) {
            sessionStorage.removeItem(STORAGE_KEY);
        }

        onSubmit(payload, selectedFile);
    };

    const handleMobileCheck = async () => {
        const mobile = customerForm.mobile_number;
        if (!mobile || !/^\d{10}$/.test(mobile) || isEdit) return;

        setIsCheckingMobile(true);
        try {
            const { exists } = await apiService.checkMobileAvailability(mobile, token);
            if (exists) {
                setFormErrors(prev => ({ ...prev, mobile_number: 'Mobile number already exists in database' }));
            } else {
                setFormErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.mobile_number;
                    return newErrors;
                });
            }
        } catch (error) {
            console.error("Mobile check failed:", error);
        } finally {
            setIsCheckingMobile(false);
        }
    };

    return (
        <div className="bg-[#F8FAFC] rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-white max-w-5xl mx-auto flex flex-col min-h-[600px]">
            {/* Header / Progress Bar */}
            <div className="bg-white border-b border-slate-100 p-6 md:px-10 flex items-center justify-between">
                <div>
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-slate-800">
                        {isEdit ? 'Edit Customer Details' : 'Add New Customer'}
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">Step {currentStep} of {STEPS_COUNT}</p>
                </div>
                <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((step) => (
                        <div
                            key={step}
                            className={`h-1.5 w-8 md:w-12 rounded-full transition-all duration-500 ${currentStep >= step ? 'bg-blue-600' : 'bg-slate-200'}`}
                        />
                    ))}
                </div>
            </div>

            <main className="flex-1 p-6 md:p-10 bg-[#F8FAFC]">
                <div className="max-w-4xl mx-auto">
                    {currentStep === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <PersonalDetailsSection
                                form={customerForm}
                                errors={formErrors}
                                onChange={handleFormChange(setCustomerForm)}
                                onFileChange={handleFileChange}
                                onRemovePhoto={() => handleFormChange(setCustomerForm)('profile_picture', '')}
                                onMobileBlur={handleMobileCheck}
                                isCheckingMobile={isCheckingMobile}
                                isEdit={isEdit}
                                isUploadingPhoto={false}
                                renderPdfUpload={() => (
                                    <div className="mb-6">
                                        <PdfUploadArea
                                            onExtract={handlePdfExtract}
                                            isExtracting={isExtracting}
                                            token={token}
                                        />
                                    </div>
                                )}
                            />
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <OccupationMedicalSection
                                jobForm={jobForm}
                                medicalForm={medicalForm}
                                errors={formErrors}
                                onJobChange={handleFormChange(setJobForm)}
                                onMedicalChange={handleFormChange(setMedicalForm)}
                            />
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <FamilyMembersSection
                                members={familyMembers}
                                onAdd={() => setFamilyMembers([...familyMembers, { fullName: '', dateOfBirth: '', age: '' }])}
                                onRemove={(idx) => setFamilyMembers(familyMembers.filter((_, i) => i !== idx))}
                                onChange={(idx, field, val) => {
                                    const updated = [...familyMembers];
                                    updated[idx] = { ...updated[idx], [field]: val };
                                    setFamilyMembers(updated);
                                }}
                            />
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <PolicyDetailsSection form={policyForm} errors={formErrors} onChange={handleFormChange(setPolicyForm)} />
                        </div>
                    )}

                    {currentStep === 5 && (
                        <FormReviewStep
                            customerForm={customerForm}
                            jobForm={jobForm}
                            medicalForm={medicalForm}
                            familyMembers={familyMembers}
                            policyForm={policyForm}
                        />
                    )}
                </div>
            </main>

            <footer className="p-6 md:px-10 border-t border-slate-100 bg-white flex items-center justify-between">
                <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="h-11 px-8 rounded-xl border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all font-paragraph flex items-center gap-2"
                >
                    {currentStep === 1 ? 'Cancel' : 'Back'}
                </Button>

                <div className="flex items-center gap-3">
                    {isEdit && currentStep < STEPS_COUNT && (
                        <Button
                            type="button"
                            onClick={() => {
                                if (validateStep(currentStep)) {
                                    handleFinalSubmit();
                                }
                            }}
                            disabled={isProcessing}
                            className="hidden md:flex h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold items-center gap-2 transition-all shadow-lg shadow-indigo-200 font-paragraph"
                        >
                            Update & Submit
                        </Button>
                    )}

                    <Button
                        type="button"
                        onClick={handleNext}
                        disabled={isProcessing}
                        className="h-11 px-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-200 font-paragraph"
                    >
                        {isProcessing ? 'Processing...' : (currentStep === 5 ? 'Submit Application' : 'Next Step')}
                        {!isProcessing && currentStep < 5 && <ChevronRight className="w-4 h-4" />}
                    </Button>
                </div>
            </footer>
        </div>
    );
}
