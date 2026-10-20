// Database of 42 Realistic Kenyan Job Vacancies (Initial Fallback Data)
let sampleJobsData = [
    { id: 1, title: "Senior Software Engineer (Fintech)", company: "Safaricom PLC", location: "Nairobi", category: "Technology & ICT", salary: "KES 40,000 - 380,000", type: "Full-Time", desc: "Build scalable microservices for M-PESA payment integration pipelines." },
    { id: 2, title: "Cybersecurity Analyst", company: "Equity Bank Kenya", location: "Nairobi", category: "Banking & Finance", salary: "KES 37,000 - 300,000", type: "Full-Time", desc: "Monitor threat intelligence feeds, conduct vulnerability assessments, and safeguard banking API infrastructure." },
    { id: 3, title: "Public Health Officer", company: "AMREF Health Africa", location: "Kisumu", category: "Healthcare & NGO", salary: "KES 25,000 - 190,000", type: "Contract", desc: "Coordinate community health initiatives and maternal health interventions across Western region counties." },
    { id: 4, title: "Civil Engineer - Highways", company: "KeNHA", location: "Nakuru", category: "Engineering & Construction", salary: "KES 30,000 - 250,000", type: "Full-Time", desc: "Supervise road expansion projects, structural concrete tests, and contractor compliance audits." },
    { id: 5, title: "Cloud Solutions Architect", company: "Microsoft ADC", location: "Nairobi", category: "Technology & ICT", salary: "KES 60,000 - 600,000", type: "Full-Time", desc: "Architect enterprise Azure deployments for pan-African enterprise clients." },
    { id: 6, title: "Commercial Relationship Manager", company: "KCB Bank Kenya", location: "Mombasa", category: "Banking & Finance", salary: "KES35,000 - 260,000", type: "Full-Time", desc: "Manage corporate banking portfolios for maritime import/export enterprises." },
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
    { id: 36, title: "Communications Officer", company: "Red Cross Kenya", location: "Nairobi", category: "Healthcare & NGO", salary: "KES 40,000 - 160,000", type: "Contract", desc: "Draft press releases, coordinate disaster response media communications, and handle social channels." },
    { id: 37, title: "Geotechnical Engineer", company: "Geothermal Development Company (GDC)", location: "Naivasha", category: "Engineering & Construction", salary: "KES 55,000 - 270,000", type: "Permanent", desc: "Analyze subsurface soil and rock mechanics for steam drilling well pads." },
    { id: 38, title: "Administrative Assistant", company: "County Government of Kiambu", location: "Kiambu", category: "Public Sector & Govt", salary: "KES 30,000 - 75,000", type: "Permanent", desc: "Manage executive calendar schedules, record departmental minutes, and process records." },
    { id: 39, title: "Supply Chain Manager", company: "Unga Group", location: "Nairobi", category: "Agriculture & Agribusiness", salary: "KES 90,000 - 300,000", type: "Full-Time", desc: "Optimize grain importation, regional warehousing logistics, and mill distribution networks." },
    { id: 40, title: "UI/UX Product Designer", company: "Kopo Kopo Inc.", location: "Nairobi", category: "Technology & ICT", salary: "KES 50,000 - 220,000", type: "Full-Time", desc: "Conduct user research and design wireframes for small business merchant portals." },
    { id: 41, title: "Treasury Manager", company: "Stanbic Bank Kenya", location: "Nairobi", category: "Banking & Finance", salary: "KES 100,000 - 480,000", type: "Full-Time", desc: "Manage liquidity ratios, foreign exchange trading desks, and interbank money market positions." },
    { id: 42, title: "Research Fellow", company: "ILRI (International Livestock Research Institute)", location: "Nairobi", category: "Education & Academic", salary: "KES 80,000 - 370,000", type: "Contract", desc: "Conduct genomic research on livestock disease resistance in Sub-Saharan Africa." }
];

let currentJobs = [...sampleJobsData];
let isAuthenticated = false;
let userRole = null;
let failedLoginAttempts = 0;
let authToken = localStorage.getItem('token') || null;

document.addEventListener("DOMContentLoaded", () => {
    fetchJobs();
    setupEventListeners();
    setupPasswordStrength();
});

async function fetchJobs() {
    try {
        const response = await fetch('http://localhost:5000/api/jobs');
        if (response.ok) {
            sampleJobsData = await response.json();
        }
    } catch (err) {
        console.warn("Backend unavailable. Using local job dataset.");
    } finally {
        currentJobs = [...sampleJobsData];
        renderJobsGrid(currentJobs);
    }
}

function renderJobsGrid(jobs) {
    const grid = document.getElementById("jobsGrid");
    const countSpan = document.getElementById("jobCount");
    if (!grid) return;
    grid.innerHTML = "";
    if (countSpan) countSpan.textContent = jobs.length;

    if (jobs.length === 0) {
        grid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-search text-muted display-4"></i>
                <p class="text-muted mt-2 fs-6">No job vacancies found matching your current filters.</p>
                <button class="btn btn-outline-navy btn-sm rounded-pill" onclick="resetFilters()">Reset All Filters</button>
            </div>`;
        return;
    }

    jobs.forEach(job => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4";
        col.innerHTML = `
            <div class="card h-100 job-card rounded-3 shadow-sm bg-white" onclick="openJobDetails(${job.id})">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="badge bg-navy text-white fs-8">${job.category}</span>
                        <span class="badge bg-light text-dark border fs-8">${job.type || 'Full-Time'}</span>
                    </div>
                    <h5 class="card-title fw-bold text-navy mb-1 fs-6">${job.title}</h5>
                    <p class="text-muted small mb-2"><i class="bi bi-building me-1"></i>${job.company}</p>
                    <p class="card-text text-secondary fs-7 mb-3 flex-grow-1">${job.desc.substring(0, 85)}...</p>
                    <div class="pt-2 border-top d-flex justify-content-between align-items-center">
                        <small class="text-success fw-bold fs-7"><i class="bi bi-geo-alt me-1"></i>${job.location}</small>
                        <small class="fw-semibold text-dark fs-8">${job.salary}</small>
                    </div>
                </div>
            </div>`;
        grid.appendChild(col);
    });
}

function renderAdminTable() {
    const tbody = document.getElementById("adminTableBody");
    const totalJobsBadge = document.getElementById("adminTotalJobs");
    if (!tbody) return;
    tbody.innerHTML = "";
    if (totalJobsBadge) totalJobsBadge.textContent = sampleJobsData.length;

    sampleJobsData.forEach(job => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-bold text-navy">${job.title}</td>
            <td>${job.company}</td>
            <td><span class="badge bg-light text-dark">${job.location}</span></td>
            <td><small>${job.category}</small></td>
            <td class="small text-success fw-bold">${job.salary}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editJob(${job.id})" title="Edit Job"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteJob(${job.id})" title="Delete Job"><i class="bi bi-trash"></i></button>
            </td>`;
        tbody.appendChild(tr);
    });
}

function openJobDetails(id) {
    const job = sampleJobsData.find(j => j.id === id);
    if (!job) return;

    document.getElementById("modalJobTitle").textContent = job.title;
    document.getElementById("modalCompanyLocation").textContent = `${job.company} - ${job.location}, Kenya`;
    document.getElementById("modalCategory").textContent = job.category;
    document.getElementById("modalType").textContent = job.type || 'Full-Time';
    document.getElementById("modalSalary").textContent = job.salary;
    document.getElementById("modalDescription").textContent = job.desc;

    const reqsList = document.getElementById("modalReqs");
    if (reqsList) {
        reqsList.innerHTML = `
            <li>Relevant Degree or Higher National Diploma in a related field.</li>
            <li>Minimum 2-5 years working experience within top Kenyan enterprises.</li>
            <li>Active registration with relevant professional associations in Kenya.</li>
            <li>Demonstrated experience in ${job.category.toLowerCase()} workflows and operations.</li>`;
    }

    const cvElem = document.getElementById("sampleCvText");
    if (cvElem) {
        cvElem.textContent = 
`EMMANUEL OTIENO
Nairobi, Kenya | +254 706287933| ocholaemmanuelotieno@gmail.com

PROFESSIONAL SUMMARY
Results-driven ${job.title} professional with extensive experience delivering projects in Kenya. Skilled in industry standards, cross-functional leadership, and operational management in the ${job.category} sector.

KEY COMPETENCIES
- Sector Specialization: ${job.category}
- Regional Context: ${job.location}, Kenya
- Core Skills: Strategic Planning, Quality Assurance, Regulatory Compliance

WORK EXPERIENCE
${job.title} Candidate | Professional Industry Experience
2022 - Present | ${job.location}, Kenya
- Successfully executed key operations aligned with: ${job.desc}
- Ensured complete regulatory compliance with Kenyan laws and organizational guidelines.

EDUCATION & CERTIFICATIONS
- Bachelor’s Degree in Relevant Discipline | University of Nairobi
- Professional Certification (Certified Professional Kenya)`;
    }

    const coverElem = document.getElementById("sampleCoverText");
    if (coverElem) {
        coverElem.textContent = 
`Emmanuel Otieno
Nairobi, Kenya
+254 700 000 000 | emmanuel@example.com

${new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}

Hiring Manager,
${job.company}
${job.location}, Kenya

RE: APPLICATION FOR THE POSITION OF ${job.title.toUpperCase()}

Dear Hiring Manager,

I am writing to express my strong interest in the ${job.title} position currently open at ${job.company}. With a solid track record in ${job.category}, I am eager to contribute my technical and management skills to your team in ${job.location}.

My professional background includes hands-on experience in ${job.desc}. I am impressed by ${job.company}'s work in Kenya and am confident that my qualifications will enable me to make an immediate impact.

Thank you for reviewing my application. I look forward to discussing my suitability for this role in an interview.

Sincerely,
Emmanuel Otieno`;
    }

    const descTabBtn = document.getElementById("desc-tab");
    if (descTabBtn) {
        const tab = new bootstrap.Tab(descTabBtn);
        tab.show();
    }

    const modalEl = document.getElementById("jobDetailModal");
    if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }
}

function setupEventListeners() {
    document.getElementById("searchInput")?.addEventListener("input", filterJobs);
    document.getElementById("locationSelect")?.addEventListener("change", filterJobs);
    document.getElementById("categorySelect")?.addEventListener("change", filterJobs);

    document.getElementById("navHome")?.addEventListener("click", (e) => {
        e.preventDefault();
        showView("jobs");
    });

    document.getElementById("navDashboard")?.addEventListener("click", (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            const loginModalEl = document.getElementById("loginModal");
            if (loginModalEl) {
                const loginModal = new bootstrap.Modal(loginModalEl);
                loginModal.show();
            }
            showToast("Please login to access the admin dashboard.");
        } else {
            showView("dashboard");
        }
    });

    document.getElementById("brandLogo")?.addEventListener("click", (e) => {
        e.preventDefault();
        showView("jobs");
    });

    document.getElementById("loginForm")?.addEventListener("submit", handleLogin);
    document.getElementById("logoutBtn")?.addEventListener("click", handleLogout);
    document.getElementById("addJobForm")?.addEventListener("submit", handleSaveJob);
    document.getElementById("applyJobForm")?.addEventListener("submit", handleApplyJob);
}

function filterJobs() {
    const query = document.getElementById("searchInput")?.value.toLowerCase() || "";
    const loc = document.getElementById("locationSelect")?.value || "All";
    const cat = document.getElementById("categorySelect")?.value || "All";

    currentJobs = sampleJobsData.filter(job => {
        const matchesQuery = job.title.toLowerCase().includes(query) || job.company.toLowerCase().includes(query) || job.desc.toLowerCase().includes(query);
        const matchesLoc = (loc === "All") || (job.location === loc);
        const matchesCat = (cat === "All") || (job.category === cat);
        return matchesQuery && matchesLoc && matchesCat;
    });

    renderJobsGrid(currentJobs);
}

function resetFilters() {
    if (document.getElementById("searchInput")) document.getElementById("searchInput").value = "";
    if (document.getElementById("locationSelect")) document.getElementById("locationSelect").value = "All";
    if (document.getElementById("categorySelect")) document.getElementById("categorySelect").value = "All";
    filterJobs();
}

function handleApplyJob(e) {
    e.preventDefault();
    const applicantName = document.getElementById("applicantName")?.value.trim();
    
    const modalEl = document.getElementById("jobDetailModal");
    if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
    }

    document.getElementById("applyJobForm")?.reset();

    showToast(`Application successfully submitted! Good luck, ${applicantName}.`);
}

async function handleLogin(e) {
    e.preventDefault();
    const alertBox = document.getElementById("loginAlert");
    if (alertBox) alertBox.classList.add("d-none");

    if (failedLoginAttempts >= 3) {
        if (alertBox) {
            alertBox.textContent = "Security Lockout Active! Multiple invalid authentication attempts. Please try again later.";
            alertBox.classList.remove("d-none");
        }
        return;
    }

    const user = document.getElementById("usernameInput")?.value.trim() || "";
    const pass = document.getElementById("passwordInput")?.value.trim() || "";
    const roleSelect = document.getElementById("roleSelect");
    const role = roleSelect ? roleSelect.value : "admin";

    try {
        const res = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass, role })
        });

        const data = await res.json();

        if (res.ok) {
            authToken = data.token;
            localStorage.setItem('token', authToken);
            completeLogin(user, data.role || role);
            return;
        } else {
            failedLoginAttempts++;
            if (alertBox) {
                alertBox.textContent = data.error || `Invalid credentials! Attempt ${failedLoginAttempts} of 3.`;
                alertBox.classList.remove("d-none");
            }
            return;
        }
    } catch (err) {
        if (user === "admin" && pass === "admin123") {
            completeLogin(user, role);
        } else {
            failedLoginAttempts++;
            if (alertBox) {
                alertBox.textContent = `Invalid credentials! Attempt ${failedLoginAttempts} of 3.`;
                alertBox.classList.remove("d-none");
            }
        }
    }
}

function completeLogin(user, role) {
    isAuthenticated = true;
    userRole = role;
    failedLoginAttempts = 0;

    const userInfo = document.getElementById("userInfo");
    if (userInfo) {
        userInfo.textContent = `Logged in: ${user} (${role.toUpperCase()})`;
        userInfo.classList.remove("d-none");
    }
    document.getElementById("adminNavTab")?.classList.remove("d-none");
    document.getElementById("loginBtnNav")?.classList.add("d-none");
    document.getElementById("logoutBtn")?.classList.remove("d-none");

    const modalEl = document.getElementById("loginModal");
    if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
    }

    renderAdminTable();
    showView("dashboard");
    showToast("Authenticated successfully! Dashboard access granted.");
}

function handleLogout() {
    isAuthenticated = false;
    userRole = null;
    authToken = null;
    localStorage.removeItem('token');

    document.getElementById("userInfo")?.classList.add("d-none");
    document.getElementById("adminNavTab")?.classList.add("d-none");
    document.getElementById("loginBtnNav")?.classList.remove("d-none");
    document.getElementById("logoutBtn")?.classList.add("d-none");
    showView("jobs");
    showToast("Logged out safely.");
}

function showView(view) {
    const jobsView = document.getElementById("jobsView");
    const dashView = document.getElementById("dashboardView");
    const navHome = document.getElementById("navHome");
    const navDashboard = document.getElementById("navDashboard");

    if (view === "dashboard") {
        if (!isAuthenticated) {
            showToast("Access Denied! Secure login required.");
            return;
        }
        jobsView?.classList.add("d-none");
        dashView?.classList.remove("d-none");
        navHome?.classList.remove("active");
        navDashboard?.classList.add("active");
    } else {
        jobsView?.classList.remove("d-none");
        dashView?.classList.add("d-none");
        navHome?.classList.add("active");
        navDashboard?.classList.remove("active");
    }
}

function setupPasswordStrength() {
    const input = document.getElementById("passwordInput");
    const bar = document.getElementById("passStrengthBar");
    if (!input || !bar) return;

    input.addEventListener("input", () => {
        const val = input.value;
        let score = 0;
        if (val.length > 4) score += 30;
        if (val.length > 7) score += 40;
        if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score += 30;

        bar.style.width = score + "%";
        if (score < 40) bar.className = "progress-bar bg-danger";
        else if (score < 70) bar.className = "progress-bar bg-warning";
        else bar.className = "progress-bar bg-success";
    });
}

async function deleteJob(id) {
    if (!confirm("Are you sure you want to delete this vacancy?")) return;

    try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });

        if (res.ok) {
            await fetchJobs();
            renderAdminTable();
            showToast("Job vacancy deleted successfully.");
            return;
        }
    } catch (err) {
        const index = sampleJobsData.findIndex(j => j.id === id);
        if (index !== -1) {
            sampleJobsData.splice(index, 1);
            filterJobs();
            renderAdminTable();
            showToast("Job vacancy deleted locally.");
        }
    }
}

function editJob(id) {
    const job = sampleJobsData.find(j => j.id === id);
    if (!job) return;

    document.getElementById("jobEditId").value = job.id;
    document.getElementById("jobTitleInput").value = job.title;
    document.getElementById("jobCompanyInput").value = job.company;
    document.getElementById("jobCategoryInput").value = job.category;
    document.getElementById("jobLocationInput").value = job.location;
    document.getElementById("jobSalaryInput").value = job.salary;
    document.getElementById("jobDescInput").value = job.desc;

    document.getElementById("addJobModalTitle").textContent = "Edit Vacancy";
    const modalEl = document.getElementById("addJobModal");
    if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }
}

function prepareAddJob() {
    document.getElementById("addJobForm")?.reset();
    document.getElementById("jobEditId").value = "";
    document.getElementById("addJobModalTitle").textContent = "Post New Vacancy";
}

async function handleSaveJob(e) {
    e.preventDefault();
    const editId = document.getElementById("jobEditId").value;
    const title = document.getElementById("jobTitleInput").value.trim();
    const company = document.getElementById("jobCompanyInput").value.trim();
    const category = document.getElementById("jobCategoryInput").value;
    const location = document.getElementById("jobLocationInput").value.trim();
    const salary = document.getElementById("jobSalaryInput").value.trim();
    const desc = document.getElementById("jobDescInput").value.trim();

    const jobPayload = { title, company, category, location, salary, type: "Full-Time", desc };

    try {
        const url = editId ? `http://localhost:5000/api/jobs/${editId}` : 'http://localhost:5000/api/jobs';
        const method = editId ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(jobPayload)
        });

        if (res.ok) {
            await fetchJobs();
        }
    } catch (err) {
        if (editId) {
            const job = sampleJobsData.find(j => j.id == editId);
            if (job) Object.assign(job, jobPayload);
        } else {
            sampleJobsData.unshift({ id: Date.now(), ...jobPayload });
        }
        filterJobs();
    }

    renderAdminTable();
    const modalEl = document.getElementById("addJobModal");
    if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
    }

    showToast("Job vacancy saved successfully.");
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        showToast("Sample template copied to clipboard!");
    });
}

function showToast(msg) {
    const toastMsg = document.getElementById("toastMessage");
    if (toastMsg) toastMsg.textContent = msg;
    const toastEl = document.getElementById("liveToast");
    if (toastEl) {
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
}
function filterByCategory(category) {
    showView('jobs');
    const catSelect = document.getElementById("categorySelect");
    if (catSelect) {
        catSelect.value = category;
        filterJobs();
    }
}

function filterByLocation(location) {
    showView('jobs');
    const locSelect = document.getElementById("locationSelect");
    if (locSelect) {
        locSelect.value = location;
        filterJobs();
    }
}