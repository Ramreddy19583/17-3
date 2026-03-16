document.addEventListener('DOMContentLoaded', () => {
    // Blood Request Form
    const bloodRequestForm = document.getElementById('bloodRequestForm');
    const brSuccess = document.getElementById('brSuccess');

    if (bloodRequestForm) {
        bloodRequestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const patientName = document.getElementById('brName').value;
            const bloodGroup = document.getElementById('brGroup').value;
            const units = document.getElementById('brUnits').value;
            const location = document.getElementById('brLocation').value;
            
            // Validate
            if (!patientName || !bloodGroup || !units || !location) {
                alert('Please fill all fields for the blood request.');
                return;
            }

            const submitBtn = bloodRequestForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Locating Hospitals & Preparing Email...';
            submitBtn.disabled = true;

            // Simulate delay to locate hospitals, then prepare email
            setTimeout(() => {
                // Formatting an email body
                const emailSubject = `URGENT: ${bloodGroup} Blood Required at ${location}`;
                const emailBody = `Emergency Request:\n\nPatient: ${patientName}\nBlood Group: ${bloodGroup}\nUnits Required: ${units}\nLocation: ${location}\n\nPlease check your inventory and notify us immediately if you can fulfill this request.\n\nThank you,\nMedCare Emergency System`;
                
                console.log("Opening mail client...");

                // Open default mail client with prefilled details to dummy hospital emails
                window.location.href = `mailto:emergency1@hospital.com,emergency2@hospital.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

                // Show success
                brSuccess.style.display = 'block';
                formFadeOut(bloodRequestForm);
            }, 1500);
        });
    }

    // Donor Registration Form
    const donorRegisterForm = document.getElementById('donorRegisterForm');
    const dlSuccess = document.getElementById('dlSuccess');

    if (donorRegisterForm) {
        donorRegisterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const donorName = document.getElementById('dlName').value;
            const donorGroup = document.getElementById('dlGroup').value;
            const phone = document.getElementById('dlPhone').value;
            const city = document.getElementById('dlCity').value;

            if (!donorName || !donorGroup || !phone || !city) {
                alert('Please fill all fields to register as a donor.');
                return;
            }

            const submitBtn = donorRegisterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Registering in Database...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                console.log(`Donor Registered: ${donorName}, ${donorGroup}, ${city}`);
                
                // Show success
                dlSuccess.style.display = 'block';
                formFadeOut(donorRegisterForm);
            }, 1500);
        });
    }

    // Dashboard Tabs
    const tabDonors = document.getElementById('tabDonors');
    const tabHospitals = document.getElementById('tabHospitals');
    const donorsList = document.getElementById('donorsList');
    const hospitalsList = document.getElementById('hospitalsList');

    if (tabDonors && tabHospitals) {
        tabDonors.addEventListener('click', () => {
            tabDonors.classList.add('active');
            tabDonors.style.color = 'var(--primary)';
            tabDonors.style.borderBottom = '3px solid var(--primary)';
            
            tabHospitals.classList.remove('active');
            tabHospitals.style.color = 'var(--text-muted)';
            tabHospitals.style.borderBottom = 'none';

            donorsList.style.display = 'grid';
            hospitalsList.style.display = 'none';
        });

        tabHospitals.addEventListener('click', () => {
            tabHospitals.classList.add('active');
            tabHospitals.style.color = 'var(--primary)';
            tabHospitals.style.borderBottom = '3px solid var(--primary)';
            
            tabDonors.classList.remove('active');
            tabDonors.style.color = 'var(--text-muted)';
            tabDonors.style.borderBottom = 'none';

            hospitalsList.style.display = 'grid';
            donorsList.style.display = 'none';
        });
    }

    // Dummy Data
    const dummyDonors = [
        { name: "Alex Johnson", group: "O+", location: "Downtown", distance: "2 km" },
        { name: "Priya Sharma", group: "B-", location: "Westside", distance: "5 km" },
        { name: "Michael Chang", group: "A+", location: "North Hills", distance: "3.5 km" },
        { name: "Sarah Connor", group: "AB+", location: "East End", distance: "7 km" },
        { name: "Rahul Singh", group: "O-", location: "South Park", distance: "4 km" }
    ];

    const dummyHospitals = [
        { name: "City General Hospital", availableGroups: ["A+", "O+", "B-"], distance: "1.2 km" },
        { name: "Westside Medical Center", availableGroups: ["AB+", "A-", "O-"], distance: "3 km" },
        { name: "St. Jude's Care", availableGroups: ["B+", "O+", "AB-"], distance: "5.5 km" },
        { name: "Carewell Clinic", availableGroups: ["O+"], distance: "0.8 km" }
    ];

    // Populate Donors
    if (donorsList) {
        donorsList.innerHTML = dummyDonors.map(donor => `
            <div class="donor-card" style="background: var(--surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; display: flex; align-items: center; gap: 1rem; box-shadow: var(--shadow-sm); transition: var(--transition);">
                <div style="background: var(--primary-light); color: var(--primary); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; flex-shrink: 0;">
                    ${donor.group}
                </div>
                <div style="flex: 1;">
                    <h4 style="margin-bottom: 0.25rem;">${donor.name}</h4>
                    <div style="font-size: 0.9rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.2rem;">
                        <span><i class="fa-solid fa-location-dot" style="width: 16px;"></i> ${donor.location}</span>
                        <span><i class="fa-solid fa-route" style="width: 16px;"></i> ${donor.distance} away</span>
                    </div>
                </div>
                <button class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.9rem;" onclick="alert('Contacting donor...')"><i class="fa-solid fa-phone"></i> Contact</button>
            </div>
        `).join('');
    }

    // Populate Hospitals
    if (hospitalsList) {
        hospitalsList.innerHTML = dummyHospitals.map(hospital => `
            <div class="hospital-blood-card" style="background: var(--surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm); transition: var(--transition);">
                <h4 style="margin-bottom: 0.5rem; color: var(--secondary); display: flex; align-items: center; gap: 0.5rem;"><i class="fa-regular fa-hospital" style="color: var(--primary);"></i> ${hospital.name}</h4>
                <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">
                    <span><i class="fa-solid fa-route" style="width: 16px;"></i> ${hospital.distance} away</span>
                </div>
                <div>
                    <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem; font-weight: 600;">Available Blood Types</div>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        ${hospital.availableGroups.map(group => `<span style="background: #fee2e2; color: #b91c1c; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.85rem; font-weight: 600;">${group}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Helper to fade out form smoothly
    function formFadeOut(form) {
        form.style.transition = 'opacity 0.5s ease, height 0.5s ease';
        form.style.opacity = '0';
        setTimeout(() => {
            form.style.display = 'none';
        }, 500);
    }
});
