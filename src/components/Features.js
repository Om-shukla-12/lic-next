import { Shield, Users, CheckCircle, FileText, Calendar, BarChart, ArrowRight } from 'lucide-react';

export default function Features() {
    const stats = [
        { label: 'ACTIVE POLICIES', value: '25M+', icon: FileText, color: 'text-amber-500' },
        { label: 'TRUSTED AGENTS', value: '100k+', icon: Users, color: 'text-amber-500' },
        { label: 'CLAIMS SETTLED', value: '98%', icon: CheckCircle, color: 'text-amber-500' },
        { label: 'YEARS OF TRUST', value: '65+', icon: Shield, color: 'text-amber-500' },
    ];

    const features = [
        {
            title: 'Customer Management',
            hindi: 'ग्राहक प्रोफ़ाइल बनाएं और परिवार के सदस्यों को जोड़ें।',
            description: 'Complete customer profiles with family details seamlessly integrated.',
            icon: Users,
        },
        {
            title: 'Policy Tracking',
            hindi: 'सभी पॉलिसी एक जगह देखें।',
            description: 'Track all your policies, premiums, and maturity details in one unified dashboard.',
            icon: FileText,
        },
        {
            title: 'Appointment Service',
            hindi: 'आसान अपॉइंटमेंट बुकिंग।',
            description: 'Schedule and manage appointments with your agents or customers easily.',
            icon: Calendar,
        },
        {
            title: 'Analytics & Reports',
            hindi: 'विस्तृत विश्लेषण और रिपोर्ट।',
            description: 'Get deep insights into your portfolio and performance with visual reports.',
            icon: BarChart,
        },
    ];

    return (
        <div className="w-full bg-white">
            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-start">
                            <stat.icon className={`w-6 h-6 ${stat.color} mb-4`} />
                            <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Features Section */}
            <div className="flex flex-col md:flex-row min-h-[500px]">
                {/* Left Side - Blue Branding */}
                <div className="w-full md:w-1/3 bg-primary p-12 flex flex-col justify-center text-white">
                    <div className="w-12 h-1 bg-secondary mb-8"></div>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                        Key Features <br />
                        <span className="text-secondary">Designed for You</span>
                    </h2>
                    <p className="text-blue-100 text-lg">
                        Experience a seamless interface designed to simplify your insurance journey. Everything you need, organized perfectly.
                    </p>
                </div>

                {/* Right Side - Features Grid */}
                <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className={`p-12 border-b border-gray-100 flex flex-col justify-between group hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? 'border-r' : ''}`}
                        >
                            <div>
                                <div className="w-12 h-12 bg-blue-light rounded-full flex items-center justify-center mb-8">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
                                <p className="text-sm text-gray-500 mb-2 font-medium">{feature.hindi}</p>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                            <div className="mt-8 flex justify-end md:justify-start">
                                <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
