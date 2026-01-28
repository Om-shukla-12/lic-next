'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Users, FileText, TrendingUp, Award } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function DODashboardPage() {
    const [agents, setAgents] = useState([]);
    const [policies, setPolicies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [agentsResult, policiesResult] = await Promise.all([
                BaseCrudService.getAll('agents'),
                BaseCrudService.getAll('policies'),
            ]);
            setAgents(agentsResult?.items || []);
            setPolicies(policiesResult?.items || []);
        } catch (e) {
            console.error("Failed to load DO data", e);
        }
        setIsLoading(false);
    };

    const totalPolicies = policies.length;
    const totalPremium = policies.reduce((sum, policy) => sum + (policy.premiumAmount || 0), 0);
    const activePolicies = policies.filter(p => p.renewalStatus === 'Active').length;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1">
                <section className="bg-primary text-primary-foreground py-12">
                    <div className="max-w-[100rem] mx-auto px-8">
                        <h1 className="font-heading text-4xl mb-2">District Officer Dashboard</h1>
                        <p className="font-paragraph text-lg opacity-90">
                            डीओ डैशबोर्ड। Monitor agents and policy performance
                        </p>
                    </div>
                </section>

                <section className="max-w-[100rem] mx-auto px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        <div className="bg-card-background rounded-2xl shadow-md p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Users className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="font-paragraph text-sm text-foreground">Total Agents</p>
                                    <p className="font-heading text-3xl text-card-heading">{agents.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-card-background rounded-2xl shadow-md p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-secondary-foreground" />
                                </div>
                                <div>
                                    <p className="font-paragraph text-sm text-foreground">Total Policies</p>
                                    <p className="font-heading text-3xl text-card-heading">{totalPolicies}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-card-background rounded-2xl shadow-md p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="font-paragraph text-sm text-foreground">Active Policies</p>
                                    <p className="font-heading text-3xl text-card-heading">{activePolicies}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-card-background rounded-2xl shadow-md p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                                    <Award className="w-6 h-6 text-secondary-foreground" />
                                </div>
                                <div>
                                    <p className="font-paragraph text-sm text-foreground">Total Premium</p>
                                    <p className="font-heading text-2xl text-card-heading">₹{totalPremium.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card-background rounded-2xl shadow-md p-8 mb-12">
                        <h2 className="font-heading text-2xl text-card-heading mb-6">Agent Performance</h2>
                        <div className="min-h-[400px]">
                            {isLoading ? (
                                <div className="flex justify-center items-center h-48">
                                    <LoadingSpinner />
                                </div>
                            ) : agents.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-muted">
                                                <th className="text-left font-heading text-base text-card-heading py-3 px-4">Agent Name</th>
                                                <th className="text-left font-heading text-base text-card-heading py-3 px-4">Employee ID</th>
                                                <th className="text-left font-heading text-base text-card-heading py-3 px-4">Contact</th>
                                                <th className="text-left font-heading text-base text-card-heading py-3 px-4">Policies Sold</th>
                                                <th className="text-left font-heading text-base text-card-heading py-3 px-4">District Officer</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {agents.map((agent) => (
                                                <tr key={agent._id} className="border-b border-muted hover:bg-upload-area-background">
                                                    <td className="font-paragraph text-base text-foreground py-4 px-4">
                                                        {agent.agentName}
                                                    </td>
                                                    <td className="font-paragraph text-sm text-muted-foreground py-4 px-4">
                                                        {agent.employeeId}
                                                    </td>
                                                    <td className="font-paragraph text-sm text-foreground py-4 px-4">
                                                        {agent.contactNumber}
                                                    </td>
                                                    <td className="font-heading text-lg text-primary py-4 px-4">
                                                        {agent.totalPoliciesSold || 0}
                                                    </td>
                                                    <td className="font-paragraph text-sm text-foreground py-4 px-4">
                                                        {agent.assignedDistrictOfficerName || 'N/A'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Users className="w-16 h-16 text-muted mx-auto mb-4" />
                                    <h3 className="font-heading text-xl text-card-heading mb-2">
                                        No Agents Found
                                    </h3>
                                    <p className="font-paragraph text-base text-foreground">
                                        कोई एजेंट नहीं। No agents registered in your district
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-card-background rounded-2xl shadow-md p-8">
                        <h2 className="font-heading text-2xl text-card-heading mb-6">Policy Summary</h2>
                        <div className="min-h-[300px]">
                            {isLoading ? (
                                <div className="flex justify-center items-center h-48">
                                    <LoadingSpinner />
                                </div>
                            ) : policies.length > 0 ? (
                                <div className="space-y-4">
                                    {policies.slice(0, 10).map((policy) => (
                                        <div
                                            key={policy._id}
                                            className="bg-upload-area-background border border-upload-area-border rounded-lg p-4 flex justify-between items-center"
                                        >
                                            <div>
                                                <h3 className="font-heading text-base text-card-heading mb-1">
                                                    {policy.policyName}
                                                </h3>
                                                <p className="font-paragraph text-sm text-muted-foreground">
                                                    {policy.policyNumber}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-heading text-lg text-primary">
                                                    ₹{policy.premiumAmount?.toLocaleString()}
                                                </p>
                                                <p className="font-paragraph text-xs text-foreground">
                                                    {policy.renewalStatus}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    {policies.length > 10 && (
                                        <p className="text-center font-paragraph text-sm text-muted-foreground pt-4">
                                            Showing 10 of {policies.length} policies
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <FileText className="w-16 h-16 text-muted mx-auto mb-4" />
                                    <h3 className="font-heading text-xl text-card-heading mb-2">
                                        No Policies Found
                                    </h3>
                                    <p className="font-paragraph text-base text-foreground">
                                        कोई पॉलिसी नहीं। No policies in the system
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
