import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

const PersonalDetailsSection = dynamic(() => import('./PersonalDetailsSection').then(mod => mod.PersonalDetailsSection), { ssr: false });
const FamilyMembersSection = dynamic(() => import('./FamilyMembersSection').then(mod => mod.FamilyMembersSection), { ssr: false });
const NomineeSection = dynamic(() => import('./NomineeSection').then(mod => mod.NomineeSection), { ssr: false });
const OccupationMedicalSection = dynamic(() => import('./OccupationMedicalSection').then(mod => mod.OccupationMedicalSection), { ssr: false });
const PolicyDetailsSection = dynamic(() => import('./PolicyDetailsSection').then(mod => mod.PolicyDetailsSection), { ssr: false });
const ExistingPoliciesSection = dynamic(() => import('./ExistingPoliciesSection').then(mod => mod.ExistingPoliciesSection), { ssr: false });
const FormReviewStep = dynamic(() => import('./FormReviewStep').then(mod => mod.FormReviewStep), { ssr: false });
import { Plus, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { customerSchema, nomineeSchema, jobSchema, medicalSchema, policySchema } from '@/lib/validations';

const STEPS_COUNT = 5;

export default function AddCustomerForm({ onSubmit, onCancel, isProcessing, initialData = null }) {
    const isEdit = !!initialData;
    const [currentStep, setCurrentStep] = useState(1);
    const [customerForm, setCustomerForm] = useState({
        customer_name: '', father_name: '', mother_name: '', spouse_name: '',
        dob: '', address: '', village: '', pincode: '',
        mobile_number: '', email: '', aadhaar_number: '', pan_number: '',
        profile_picture: '', gender: ''
    });

    const [nomineeForm, setNomineeForm] = useState({ nominee_name: '', relation: '', age: '', pan_number: '' });
    const [jobForm, setJobForm] = useState({ type: 'Job', address: '', annual_income: '' });
    const [medicalForm, setMedicalForm] = useState({ height: '', weight: '' });
    const [policyForm, setPolicyForm] = useState({
        insurance_rate: 8.5,
        insurance_number: `LIC${Date.now()}`,
        premium_year: 20,
        maturity_date: '',
        installment_type: 'Monthly',
        installment_price: '',
        birth_place: '',
    });

    const [familyMembers, setFamilyMembers] = useState([]);
    const [existingPolicies, setExistingPolicies] = useState([]);
    const [formErrors, setFormErrors] = useState({});

    // Populate form data if in edit mode
    useEffect(() => {
        if (initialData) {
            setCustomerForm({
                ...initialData.customer,
                profile_picture: initialData.customer?.profile_picture || ''
            });
            setNomineeForm({
                ...initialData.nominee,
                age: initialData.nominee?.age?.toString() || ''
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
                ...initialData.policy,
                insurance_rate: initialData.policy?.insurance_rate || 8.5,
                premium_year: initialData.policy?.premium_year || 20,
                installment_price: initialData.policy?.installment_price?.toString() || ''
            });
            setFamilyMembers((initialData.family_members || []).map(m => ({
                fullName: m.name, relationship: m.relation, dateOfBirth: m.dob, gender: 'Male', age: m.age?.toString() || '', aadhaarNumber: ''
            })));
            setExistingPolicies((initialData.existing_family_policies || []).map(p => ({
                name: p.name, relation: p.relation, policyNumber: p.policy_number,
                policyDate: p.policy_date, policyAmount: p.policy_amount?.toString() || ''
            })));
        }
    }, [initialData]);

    const handleFormChange = (setter) => (field, value) => {
        setter(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => handleFormChange(setCustomerForm)('profile_picture', reader.result);
            reader.readAsDataURL(file);
        }
    };

    const validateStep = (step) => {
        const errors = {};
        let isValid = true;

        if (step === 1) {
            const customerVal = customerSchema.safeParse(customerForm);
            if (!customerVal.success) {
                customerVal.error.issues.forEach(i => errors[i.path[0]] = i.message);
                isValid = false;
            }
        } else if (step === 2) {
            const nomineeVal = nomineeSchema.safeParse(nomineeForm);
            if (!nomineeVal.success) {
                nomineeVal.error.issues.forEach(i => errors[i.path[0] === 'relation' ? 'nominee_relation' : i.path[0] === 'age' ? 'nominee_age' : i.path[0]] = i.message);
                isValid = false;
            }
            const jobVal = jobSchema.safeParse(jobForm);
            if (!jobVal.success) {
                jobVal.error.issues.forEach(i => errors[i.path[0] === 'address' ? 'job_address' : i.path[0]] = i.message);
                isValid = false;
            }
        } else if (step === 4) {
            const policyVal = policySchema.safeParse(policyForm);
            if (!policyVal.success) {
                policyVal.error.issues.forEach(i => errors[i.path[0]] = i.message);
                isValid = false;
            }
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep < STEPS_COUNT) {
                setCurrentStep(prev => prev + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                handleFinalSubmit();
            }
        } else {
            // Scroll to the first error message
            setTimeout(() => {
                const firstError = document.querySelector('.text-destructive');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
            customer: customerForm,
            nominee: { ...nomineeForm, age: parseInt(nomineeForm.age) || 0 },
            job_business: { ...jobForm, annual_income: parseFloat(jobForm.annual_income) || 0 },
            medical: { height: parseFloat(medicalForm.height) || 0, weight: parseFloat(medicalForm.weight) || 0 },
            family_members: familyMembers.map(m => ({
                relation: m.relationship, name: m.fullName, age: parseInt(m.age) || 0, dob: m.dateOfBirth,
                is_deceased: false, age_at_death: null, reason_of_death: null
            })),
            policy: {
                ...policyForm,
                insurance_rate: parseFloat(policyForm.insurance_rate),
                premium_year: parseInt(policyForm.premium_year),
                installment_price: parseFloat(policyForm.installment_price)
            },
            existing_family_policies: existingPolicies.map(p => ({
                name: p.name, relation: p.relation, policy_number: p.policyNumber,
                policy_date: p.policyDate, policy_amount: parseFloat(p.policyAmount) || 0
            }))
        };
        onSubmit(payload);
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
                            />
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <NomineeSection form={nomineeForm} errors={formErrors} onChange={handleFormChange(setNomineeForm)} />
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
                                onAdd={() => setFamilyMembers([...familyMembers, { fullName: '', relationship: '', dateOfBirth: '', gender: 'Male', age: '', aadhaarNumber: '' }])}
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
                            <ExistingPoliciesSection
                                policies={existingPolicies}
                                onAdd={() => setExistingPolicies([...existingPolicies, { name: '', relation: '', policyNumber: '', policyDate: '', policyAmount: '' }])}
                                onRemove={(idx) => setExistingPolicies(existingPolicies.filter((_, i) => i !== idx))}
                                onChange={(idx, field, val) => {
                                    const updated = [...existingPolicies];
                                    updated[idx] = { ...updated[idx], [field]: val };
                                    setExistingPolicies(updated);
                                }}
                            />
                        </div>
                    )}

                    {currentStep === 5 && (
                        <FormReviewStep
                            customerForm={customerForm}
                            nomineeForm={nomineeForm}
                            jobForm={jobForm}
                            medicalForm={medicalForm}
                            familyMembers={familyMembers}
                            policyForm={policyForm}
                            existingPolicies={existingPolicies}
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

                <Button
                    type="button"
                    onClick={handleNext}
                    disabled={isProcessing}
                    className="h-11 px-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-200 font-paragraph"
                >
                    {isProcessing ? 'Processing...' : (currentStep === 5 ? 'Submit Application' : 'Next Step')}
                    {!isProcessing && currentStep < 5 && <ChevronRight className="w-4 h-4" />}
                </Button>
            </footer>
        </div>
    );
}
