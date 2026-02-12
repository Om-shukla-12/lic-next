import { useState, useCallback, useEffect } from 'react';
import { apiService } from '@/lib/api-service';
import { useAuthContext } from '@/context/AuthContext';

/**
 * Custom hook to manage birthday data
 */
export const useBirthdays = () => {
    const { token } = useAuthContext();
    const [todayBirthdays, setTodayBirthdays] = useState([]);
    const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadBirthdays = useCallback(async () => {
        if (!token) return;

        setIsLoading(true);
        setError(null);
        try {
            const allRecords = await apiService.getMyRecords(token);

            const now = new Date();
            const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const yesterdayDate = new Date(todayDate);
            yesterdayDate.setDate(todayDate.getDate() - 1);

            const nextWeekDate = new Date(todayDate);
            nextWeekDate.setDate(todayDate.getDate() + 7);

            const today = [];
            const yesterday = [];
            const week = [];

            const checkDate = (dobStr, record, role, relation = null) => {
                if (!dobStr) return;
                const dob = new Date(dobStr);
                const currentYear = todayDate.getFullYear();

                // Create comparable dates for this year and next year (to handle Dec-Jan wrap)
                const thisYearBday = new Date(currentYear, dob.getMonth(), dob.getDate());
                const nextYearBday = new Date(currentYear + 1, dob.getMonth(), dob.getDate());

                const person = {
                    name: role === 'Customer' ? record.customer.customer_name : record.name,
                    role: role,
                    relation: relation,
                    dob: dobStr,
                    mobile: record.customer?.mobile_number,
                    customerId: record.customer?._id,
                    customerName: role !== 'Customer' ? record.customer?.customer_name : null
                };

                // Check Today
                if (thisYearBday.getTime() === todayDate.getTime()) {
                    today.push(person);
                }

                // Check Yesterday
                if (thisYearBday.getTime() === yesterdayDate.getTime() ||
                    (yesterdayDate.getFullYear() < currentYear && nextYearBday.getTime() === yesterdayDate.getTime())) { // Edge case not really needed for yesterday calculation relative to today but good for consistency
                    // Actually simple comparison is better:
                    // We care if Month/Day matches yesterday's Month/Day
                    if (dob.getMonth() === yesterdayDate.getMonth() && dob.getDate() === yesterdayDate.getDate()) {
                        yesterday.push(person);
                    }
                }

                // Check Previous Day (Yesterday Logic Revision)
                // Let's stick to Month/Day strict comparison which is safer for birthdays
                const isSameMonthDay = (d1, d2) => d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

                if (isSameMonthDay(dob, yesterdayDate)) {
                    // already pushed? No, the logic above was tentative. 
                    // Let's clear and re-do with cleaner logic below.
                }
            };

            // --- Refined Logic ---
            const processRecord = (name, dobStr, role, record, relation = null) => {
                if (!dobStr) return;
                const dob = new Date(dobStr);

                const person = {
                    name: name,
                    role: role,
                    relation: relation,
                    dob: dobStr,
                    mobile: record.customer?.mobile_number,
                    customerId: record.customer?._id,
                    customerName: role !== 'Customer' ? record.customer?.customer_name : null,
                    // For sorting
                    originalDob: dob
                };

                // Helper to check if a birthday falls in a range relative to today
                // We define "birthday for this year"
                let bdayThisYear = new Date(todayDate.getFullYear(), dob.getMonth(), dob.getDate());

                // Handle leap years if necessary, but Date object handles it usually.

                // Check Yesterday
                if (bdayThisYear.getMonth() === yesterdayDate.getMonth() && bdayThisYear.getDate() === yesterdayDate.getDate()) {
                    yesterday.push(person);
                }

                // Check Today
                if (bdayThisYear.getMonth() === todayDate.getMonth() && bdayThisYear.getDate() === todayDate.getDate()) {
                    today.push(person);
                }

                // Check This Week (Today + Next 6 days)
                // We check if the birthday is between today (inclusive) and nextWeekDate (exclusive)
                // Need to handle year wrapping for end of year.
                // Approach: check if bdayThisYear is >= today and < nextWeek
                // OR if bdayNextYear is >= today and < nextWeek

                const bdayNextYear = new Date(todayDate.getFullYear() + 1, dob.getMonth(), dob.getDate());

                if (bdayThisYear >= todayDate && bdayThisYear < nextWeekDate) {
                    week.push({ ...person, sortDate: bdayThisYear });
                } else if (bdayNextYear >= todayDate && bdayNextYear < nextWeekDate) {
                    week.push({ ...person, sortDate: bdayNextYear });
                }
            };

            (allRecords || []).forEach(record => {
                if (record.customer) {
                    processRecord(record.customer.customer_name, record.customer.dob, 'Customer', record);
                }
                if (record.family_members && Array.isArray(record.family_members)) {
                    record.family_members.forEach(m => {
                        processRecord(m.name, m.dob, 'Family Member', record, m.relation || 'Relative');
                    });
                }
            });

            week.sort((a, b) => a.sortDate - b.sortDate);

            setTodayBirthdays(today);
            setUpcomingBirthdays({
                yesterday,
                week
            });

        } catch (e) {
            console.error("Failed to load birthdays", e);
            if (e.message === 'UNAUTHORIZED') {
                setError("Session expired. Please log in again.");
            } else {
                setError(e.message);
            }
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        loadBirthdays();
    }, [loadBirthdays]);

    return { todayBirthdays, filteredBirthdays: upcomingBirthdays, isLoading, error, refresh: loadBirthdays };
};
