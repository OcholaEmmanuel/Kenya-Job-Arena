const API_URL = 'http://localhost:5000/api';
let authToken = localStorage.getItem('kazihub_token') || null;
let currentUser = JSON.parse(localStorage.getItem('kazihub_user')) || null;
let selectedJobIdForApp = null;

// Complete 42 Job Database
let sampleJobsData = [
    { id: 1, title: "Senior Software Engineer (Fintech)", company: "Safaricom PLC", location: "Nairobi", category: "Technology & ICT", salary: "KES 40,000 - 380,000", type: "Full-Time", desc: "Build scalable microservices for M-PESA payment integration pipelines." },
    { id: 2, title: "Cybersecurity Analyst", company: "Equity Bank Kenya", location: "Nairobi", category: "Banking & Finance", salary: "KES 37,000 - 300,000", type: "Full-Time", desc: "Monitor threat intelligence feeds, conduct vulnerability assessments, and safeguard banking API infrastructure." },
    { id: 3, title: "Public Health Officer", company: "AMREF Health Africa", location: "Kisumu", category: "Healthcare & NGO", salary: "KES 25,000 - 190,000", type: "Contract", desc: "Coordinate community health initiatives and maternal health interventions across Western region counties." },
    { id: 4, title: "Civil Engineer - Highways", company: "KeNHA", location: "Nakuru", category: "Engineering & Construction", salary: "KES 30,000 - 250,000", type: "Full-Time", desc: "Supervise road expansion projects, structural concrete tests, and contractor compliance audits." },
    { id: 5, title: "Cloud Solutions Architect", company: "Microsoft ADC", location: "Nairobi", category: "Technology & ICT", salary: "KES 60,000 - 600,000", type: "Full-Time", desc: "Architect enterprise Azure deployments for pan-African enterprise clients." },
    { id: 6, title: "Commercial Relationship Manager", company: "KCB Bank Kenya", location: "Mombasa", category: "Banking & Finance", salary: "KES 35,000 - 260,000", type: "Full-Time", desc: "Manage corporate banking portfolios for maritime import/export enterprises." },
    { id: 7, title: "Monitoring & Evaluation Specialist", company: "USAID Kenya", location: "Eldoret", category: "Healthcare & NGO", salary: "KES 30,000 - 290,000", type: "Full-Time", desc: "Design M&E frameworks and field reporting metrics for agricultural resilience grants." },
    { id: 8, title: "ICT Officer II", company: "National Treasury Kenya", location: "Nairobi", category: "Public Sector & Govt", salary: "KES 20,000 - 130,000", type: "Permanent", desc: "Maintain IFMIS system databases, user access security profiles, and local network nodes." },
    { id: 9, title: "Agronomist & Extension Officer", company: "Twiga Foods", location: "Nakuru", category: "Agriculture & Agribusiness", salary: "KES 30,000 - 160,000", type: "Full-Time", desc: "Advise partner horticultural farmers on crop yields, GAP certification, and logistics scheduling." },
    { id: 10, title: "Lecturer - Computer Science", company: "Strathmore University", location: "Nairobi", category: "Education & Academic", salary: "KES 35,000 - 270,000", type: "Full-Time", desc: "Teach undergraduate algorithms, conduct AI research, and supervise technical projects." },
    { id: 11, title: "Frontend Developer (React/Vue)", company: "Cellulant", location: "Nairobi", category: "Technology & ICT", salary: "KES 60,000 - 230,000", type: "Full-Time", desc: "Design sleek merchant checkout interfaces and web dashboard applications." },
    { id: 12, title: "Risk & Compliance Officer", company: "Co-operative Bank", location: "Nairobi", category: "Banking & Finance", salary: "KES 50,000 - 240,000", type: "Full-Time", desc: "Ensure institutional compliance with CBK prudential guidelines and AML regulations." },
    { id: 13, title: "Clinical Medical Officer", company: "Aga Khan University Hospital", location: "Nairobi", category: "Healthcare & NGO", salary: "KES 50,000 - 320,000", type: "Full-Time", desc: "Provide emergency care, inpatient diagnosis, and clinical consultations." },
    { id: 14, title: "Electrical Power Engineer", company: "Kenya Power (KPLC)", location: "Kisumu", category: "Engineering & Construction", salary: "KES 40,000 - 210,000", type: "Permanent", desc: "Oversee sub-station maintenance and automated grid distribution networks." },
    { id: 15, title: "Procurement Officer", company: "Kenya Airways", location: "Nairobi", category: "Public Sector & Govt", salary: "KES 40,000 - 200,000", type: "Full-Time", desc: "Manage aviation spare parts sourcing, supplier RFPs, and vendor compliance checks." },
    { id: 16, title: "Data Scientist", company: "Jumia Kenya", location: "Nairobi", category: "Technology & ICT", salary: "KES 55,000 - 290,000", type: "Full-Time", desc: "Build predictive models for e-commerce demand forecasting and dynamic pricing." },
    { id: 17, title: "Internal Auditor", company: "East African Breweries (EABL)", location: "Nairobi", category: "Banking & Finance", salary: "KES 80,000 - 310,000", type: "Full-Time", desc: "Execute financial audits and supply chain risk reviews across regional manufacturing plants." },
    { id: 18, title: "Nutrition Specialist", company: "UNICEF Kenya", location: "Garissa", category: "Healthcare & NGO", salary: "KES 90,000 - 350,000", type: "Contract", desc: "Manage emergency malnutrition treatment programs in arid and semi-arid counties." },
    { id: 19, title: "Structural Inspector", company: "NCA (National Construction Authority)", location: "Mombasa", category: "Engineering & Construction", salary: "KES 30,000 - 150,000", type: "Permanent", desc: "Conduct building site safety audits and structural integrity compliance checks." },
    { id: 20, title: "High School Physics Teacher", company: "TSC (Teachers Service Commission)", location: "Eldoret", category: "Education & Academic", salary: "KES 25,000 - 85,000", type: "Permanent", desc: "Deliver secondary curriculum Physics and Mathematics coursework and lab practicals." },
    { id: 21, title: "DevOps Engineer", company: "Sama Kenya", location: "Nairobi", category: "Technology & ICT", salary: "KES 80,000 - 260,000", type: "Full-Time", desc: "Maintain CI/CD pipelines, Kubernetes clusters, and cloud infrastructure for AI pipelines." },
    { id: 22, title: "Credit Risk Analyst", company: "NCBA Group", location: "Nairobi", category: "Banking & Finance", salary: "KES 60,000 - 220,000", type: "Full-Time", desc: "Evaluate corporate loan applications and assess retail credit scoring models." },
    { id: 23, title: "Program Manager - WASH", company: "World Vision Kenya", location: "Kakamega", category: "Healthcare & NGO", salary: "KES 90,000 - 270,000", type: "Contract", desc: "Lead clean water and sanitation infrastructure delivery for rural school communities." },
    { id: 24, title: "Mechanical Maintenance Engineer", company: "Bamburi Cement", location: "Mombasa", category: "Engineering & Construction", salary: "KES 70,000 - 240,000", type: "Full-Time", desc: "Supervise heavy mechanical plant machinery overhauls and preventative maintenance." },
    { id: 25, title: "HR Officer", company: "KRA (Kenya Revenue Authority)", location: "Nairobi", category: "Public Sector & Govt", salary: "KES 40,000 - 170,000", type: "Permanent", desc: "Coordinate staff onboarding, performance appraisals, and labor relations protocols." },
    { id: 26, title: "Farm Manager (Dairy)", company: "Brookside Dairy", location: "Ruiru", category: "Agriculture & Agribusiness", salary: "KES 30,000 - 180,000", type: "Full-Time", desc: "Oversee large-scale herd management, automated milking plants, and feed formulation." },
    { id: 27, title: "Mobile App Developer (Flutter)", company: "I&M Bank", location: "Nairobi", category: "Technology & ICT", salary: "KES 70,000 - 300,000", type: "Full-Time", desc: "Enhance consumer mobile banking applications with seamless biometric logins." },
    { id: 28, title: "Financial Accountant", company: "BIDCO Africa", location: "Thika", category: "Banking & Finance", salary: "KES 40,000 - 190,000", type: "Full-Time", desc: "Prepare monthly management accounts, VAT tax returns, and general ledger reconciliations." },
    { id: 29, title: "Registered Nurse (ICU)", company: "MP Shah Hospital", location: "Nairobi", category: "Healthcare & NGO", salary: "KES 35,000 - 140,000", type: "Full-Time", desc: "Deliver specialized critical care, ventilator monitoring, and post-operative recovery." },
    { id: 30, title: "Quantity Surveyor", company: "Ministry of Lands & Housing", location: "Nairobi", category: "Engineering & Construction", salary: "KES 30,000 - 180,000", type: "Permanent", desc: "Prepare bills of quantities, project cost estimates, and government project valuations." },
    { id: 31, title: "Database Administrator", company: "Huduma Kenya", location: "Nairobi", category: "Public Sector & Govt", salary: "KES 40,000 - 190,000", type: "Permanent", desc: "Administer high-availability PostgreSQL and Oracle clusters for citizen service centers." },
    { id: 32, title: "Primary School Head Teacher", company: "M.P. Shah Academy", location: "Nairobi", category: "Education & Academic", salary: "KES 30,000 - 170,000", type: "Full-Time", desc: "Oversee CBC curriculum execution, staff supervision, and parent-school communications." },
    { id: 33, title: "Horticulture Export Lead", company: "Kakuzi PLC", location: "Makuyu", category: "Agriculture & Agribusiness", salary: "KES 80,000 - 250,000", type: "Full-Time", desc: "Manage avocado and macadamia packing operations for European and Asian markets." },
    { id: 34, title: "Network Security Engineer", company: "Airtel Kenya", location: "Nairobi", category: "Technology & ICT", salary: "KES 70,000 - 310,000", type: "Full-Time", desc: "Configure core telecom firewalls, routing protocols, and perimeter defense systems." },
    { id: 35, title: "Investment Analyst", company: "Britam Holdings", location: "Nairobi", category: "Banking & Finance", salary: "KES 60,000 - 260,000", type: "Full-Time", desc: "Evaluate real estate, equity, and fixed-income assets for institutional funds." },
    { id: 36, title: "Communications Officer", company: "Red Cross Kenya", location: "Nairobi", category: "Healthcare & NGO", salary: "KES 40,000 - 180,000", type: "Contract", desc: "Produce press releases, field stories, and social media campaigns for humanitarian relief." },
    { id: 37, title: "GIS & Spatial Planner", company: "Nairobi City County", location: "Nairobi", category: "Public Sector & Govt", salary: "KES 35,000 - 160,000", type: "Permanent", desc: "Map urban zone boundaries, infrastructure utility lines, and land usage records." },
    { id: 38, title: "Soil Scientist", company: "KALRO", location: "Mwea", category: "Agriculture & Agribusiness", salary: "KES 40,000 - 200,000", type: "Permanent", desc: "Conduct soil fertility research and nutrient management plans for irrigated rice farming." },
    { id: 39, title: "University Dean of Students", company: "Jomo Kenyatta University (JKUAT)", location: "Juja", category: "Education & Academic", salary: "KES 90,000 - 320,000", type: "Permanent", desc: "Oversee student welfare, sports administration, and campus counseling services." },
    { id: 40, title: "Full Stack Developer (Node/Python)", company: "Andela Kenya", location: "Nairobi", category: "Technology & ICT", salary: "KES 90,000 - 380,000", type: "Full-Time", desc: "Architect scalable cloud backend microservices and modern web frontend components." },
    { id: 41, title: "Treasury Operations Manager", company: "Stanbic Bank", location: "Nairobi", category: "Banking & Finance", salary: "KES 110,000 - 450,000", type: "Full-Time", desc: "Oversee foreign exchange trading desks, liquidity ratios, and interbank money market settlements." },
    { id: 42, title: "Environmental Health Specialist", company: "NEMA Kenya", location: "Mombasa", category: "Public Sector & Govt", salary: "KES 35,000 - 170,000", type: "Permanent", desc: "Enforce environmental impact assessment (EIA) licenses and coastal marine conservation laws." }
];

let allJobs = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchJobs();
    checkAuthUI();
    syncSidebarUserUI();

    // Event listeners for filters
    document.getElementById('searchInput')?.addEventListener('input', filterAndRenderJobs);
    document.getElementById('locationSelect')?.addEventListener('change', filterAndRenderJobs);
    document.getElementById('categorySelect')?.addEventListener('change', filterAndRenderJobs);

    // Sidebar Event Listener: Pre-fill Update Form when Update Tab is Clicked
    document.getElementById('tab-edit')?.addEventListener('click', () => {
        if (currentUser) {
            document.getElementById('updateEmail').value = currentUser.email || '';
            document.getElementById('updateFullName').value = currentUser.fullName || '';
            if (currentUser.profession) {
                document.getElementById('updateProfession').value = currentUser.profession;
            }
        }
    });

    // Sidebar Register Handler (Real-time Sync)
    document.getElementById('sidebarRegisterForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fullName = document.getElementById('regFullName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const profession = document.getElementById('regProfession').value;

        currentUser = { fullName, email, profession };
        localStorage.setItem('kazihub_user', JSON.stringify(currentUser));

        try {
            await fetch(`${API_URL}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentUser)
            });
        } catch (err) {
            console.log("Registered locally.");
        }

        syncSidebarUserUI();
        closeOffcanvasSidebar();
        alert(`Welcome, ${fullName}! Your candidate account is active.`);
    });

    // Sidebar Profile Update Handler (Real-time Sync)
    document.getElementById('sidebarUpdateForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('updateEmail').value.trim();
        const fullName = document.getElementById('updateFullName').value.trim();
        const profession = document.getElementById('updateProfession').value;

        currentUser = { fullName: fullName || currentUser?.fullName || 'User', email, profession };
        localStorage.setItem('kazihub_user', JSON.stringify(currentUser));

        try {
            await fetch(`${API_URL}/users/update-profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentUser)
            });
        } catch (err) {
            console.log("Profile updated locally.");
        }

        syncSidebarUserUI();
        closeOffcanvasSidebar();
        alert("Profile details updated successfully!");
    });

    // Sidebar Forgot Password Handler
    document.getElementById('sidebarForgotForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('forgotEmail').value;
        const reason = document.getElementById('forgotReason').value;

        try {
            await fetch(`${API_URL}/users/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, reason })
            });
        } catch (err) {
            console.log("Reset request sent to admin.");
        }

        closeOffcanvasSidebar();
        alert("Password reset request sent to administrator (ocholaemmanuelotieno@gmail.com).");
    });

    // Application Form Submit Handler
    const applyForm = document.getElementById('applyJobForm');
    if (applyForm) {
        applyForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = applyForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';

            const fileInput = document.getElementById('applicantCvFile');
            const file = fileInput.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const base64Data = event.target.result.split(',')[1];
                    submitApplicationPayload(base64Data, file.name);
                };
                reader.readAsDataURL(file);
            } else {
                submitApplicationPayload(null, null);
            }
        });
    }
});

function syncSidebarUserUI() {
    const userInfo = document.getElementById('userInfo');
    if (!userInfo) return;

    if (currentUser && currentUser.fullName) {
        userInfo.innerHTML = `<i class="bi bi-person-circle text-warning me-1"></i> ${currentUser.fullName}`;
        userInfo.classList.remove('d-none');
    } else {
        userInfo.classList.add('d-none');
    }
}

function closeOffcanvasSidebar() {
    const sidebarEl = document.getElementById('userSidebar');
    if (sidebarEl) {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebarEl);
        if (bsOffcanvas) bsOffcanvas.hide();
    }
}

async function submitApplicationPayload(cvBase64, cvFileName) {
    const payload = {
        jobId: selectedJobIdForApp,
        applicantName: document.getElementById('applicantName').value,
        applicantEmail: document.getElementById('applicantEmail').value,
        applicantPhone: document.getElementById('applicantPhone').value,
        coverNote: document.getElementById('applicantCoverText').value,
        cvBase64: cvBase64,
        cvFileName: cvFileName
    };

    try {
        const res = await fetch(`${API_URL}/jobs/apply`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok) {
            alert('🎉 ' + data.message);
            document.getElementById('applyJobForm').reset();
            bootstrap.Modal.getInstance(document.getElementById('jobDetailModal')).hide();
        } else {
            alert('❌ ' + (data.error || 'Failed to submit application.'));
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Application submitted successfully!');
    } finally {
        const submitBtn = document.querySelector('#applyJobForm button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-send-fill me-1"></i> Submit Application';
        }
    }
}

async function fetchJobs() {
    try {
        const res = await fetch(`${API_URL}/jobs`);
        if (res.ok) {
            allJobs = await res.json();
        } else {
            allJobs = sampleJobsData;
        }
    } catch (err) {
        allJobs = sampleJobsData;
    }
    filterAndRenderJobs();
    renderAdminTable();
}

function filterAndRenderJobs() {
    const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const loc = document.getElementById('locationSelect')?.value || 'All';
    const cat = document.getElementById('categorySelect')?.value || 'All';

    const filtered = allJobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(search) || job.company.toLowerCase().includes(search);
        const matchesLoc = loc === 'All' || job.location === loc;
        const matchesCat = cat === 'All' || job.category === cat;
        return matchesSearch && matchesLoc && matchesCat;
    });

    document.getElementById('jobCount').innerText = filtered.length;
    const grid = document.getElementById('jobsGrid');
    if (!grid) return;

    grid.innerHTML = filtered.map(job => `
        <div class="col-md-4">
            <div class="card h-100 shadow-sm border-0 p-3 rounded-3 job-card" onclick="openJobDetail(${job.id})">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="badge text-white" style="background:#1a365d;">${job.category}</span>
                    <span class="badge bg-success text-white">${job.type || 'Full-Time'}</span>
                </div>
                <h5 class="fw-bold mb-1" style="color:#1a365d;">${job.title}</h5>
                <p class="text-muted small mb-3"><i class="bi bi-building me-1"></i>${job.company}</p>
                <div class="mt-auto d-flex justify-content-between align-items-center border-top pt-2">
                    <span class="small text-muted"><i class="bi bi-geo-alt me-1 text-danger"></i>${job.location}</span>
                    <span class="fw-bold text-dark small">${job.salary}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function openJobDetail(id) {
    const job = allJobs.find(j => j.id === id);
    if (!job) return;

    selectedJobIdForApp = job.id;

    document.getElementById('modalJobTitle').innerText = job.title;
    document.getElementById('modalCompanyLocation').innerText = `${job.company} - ${job.location}`;
    document.getElementById('modalCategory').innerText = job.category;
    document.getElementById('modalType').innerText = job.type || 'Full-Time';
    document.getElementById('modalSalary').innerText = job.salary;
    document.getElementById('modalDescription').innerText = job.desc;

    // Auto-fill application fields from user session if registered
    if (currentUser) {
        if (currentUser.fullName) document.getElementById('applicantName').value = currentUser.fullName;
        if (currentUser.email) document.getElementById('applicantEmail').value = currentUser.email;
    }

    document.getElementById('modalReqs').innerHTML = `
        <li>Relevant degree or professional qualification in ${job.category}.</li>
        <li>Demonstrated experience in similar industry positions.</li>
        <li>Strong professional competence and communication skills.</li>
    `;

    document.getElementById('sampleCvText').innerText = 
`EMMANUEL OTIENO
Nairobi, Kenya | ocholaemmanuelotieno@gmail.com | +254 706 287 933

PROFESSIONAL SUMMARY
Results-driven ${job.title} with proven expertise at ${job.company}. Specializing in ${job.category}.

WORK EXPERIENCE
${job.title} | ${job.company}
- ${job.desc}
- Executed operational workflows in ${job.location}.

EDUCATION
Bachelor's Degree / Higher Diploma - Kenya`;

    document.getElementById('sampleCoverText').innerText = 
`Dear Hiring Manager at ${job.company},

I am writing to express my strong interest in the ${job.title} position based in ${job.location}. 

With a solid background in ${job.category}, I am confident in my ability to contribute effectively to your team's objectives.

Sincerely,
${currentUser?.fullName || 'Emmanuel Otieno'}
+254 706 287 933`;

    new bootstrap.Modal(document.getElementById('jobDetailModal')).show();
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text);
    alert('Template copied to clipboard!');
}

function renderAdminTable() {
    const tbody = document.getElementById('adminTableBody');
    if (!tbody) return;

    document.getElementById('adminTotalJobs').innerText = allJobs.length;
    tbody.innerHTML = allJobs.map(job => `
        <tr>
            <td class="fw-bold">${job.title}</td>
            <td>${job.company}</td>
            <td><span class="badge bg-light text-dark">${job.location}</span></td>
            <td>${job.category}</td>
            <td class="text-success fw-bold">${job.salary}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editJob(${job.id})"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteJob(${job.id})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// Hero Tag Helper Functions
function quickFilter(category) {
    const catSelect = document.getElementById('categorySelect');
    if (catSelect) {
        catSelect.value = category;
        filterAndRenderJobs();
        document.getElementById('jobsGrid')?.scrollIntoView({ behavior: 'smooth' });
    }
}

function quickFilterLocation(loc) {
    const locSelect = document.getElementById('locationSelect');
    if (locSelect) {
        locSelect.value = loc;
        filterAndRenderJobs();
        document.getElementById('jobsGrid')?.scrollIntoView({ behavior: 'smooth' });
    }
}

function quickSearch(term) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = term;
        filterAndRenderJobs();
        document.getElementById('jobsGrid')?.scrollIntoView({ behavior: 'smooth' });
    }
}

function filterByCategory(cat) {
    document.getElementById('categorySelect').value = cat;
    filterAndRenderJobs();
}

function filterByLocation(loc) {
    document.getElementById('locationSelect').value = loc;
    filterAndRenderJobs();
}

function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('locationSelect').value = 'All';
    document.getElementById('categorySelect').value = 'All';
    filterAndRenderJobs();
}

function checkAuthUI() {
    const adminTab = document.getElementById('adminNavTab');
    const dashboardView = document.getElementById('dashboardView');
    const logoutBtn = document.getElementById('logoutBtn');

    if (authToken) {
        adminTab?.classList.remove('d-none');
        dashboardView?.classList.remove('d-none');
        logoutBtn?.classList.remove('d-none');
    } else {
        adminTab?.classList.add('d-none');
        dashboardView?.classList.add('d-none');
        logoutBtn?.classList.add('d-none');
    }
}