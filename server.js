// ================= APPLICATION & AUTOMATED CONFIRMATION EMAIL =================
app.post('/api/jobs/apply', async (req, res) => {
    const { jobId, applicantName, applicantEmail, applicantPhone, coverNote, cvBase64, cvFileName } = req.body;

    try {
        let jobTitle = "Job Vacancy";
        let companyName = "KaziHub Partner";
        if (jobId) {
            const job = await Job.findOne({ id: parseInt(jobId) });
            if (job) {
                jobTitle = job.title;
                companyName = job.company;
            }
        }

        const newApp = new Application({
            jobId,
            applicantName,
            applicantEmail,
            applicantPhone,
            coverNote
        });
        await newApp.save();

        const applicantMailOptions = {
            from: '"KaziHub Kenya Recruitment" <ocholaemmanuelotieno@gmail.com>',
            to: applicantEmail,
            subject: `Application Received: ${jobTitle} at ${companyName}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #1a365d; color: #ffffff; padding: 20px; text-align: center;">
                        <h2 style="margin: 0; color: #ffc107;">KaziHub Kenya</h2>
                        <p style="margin: 5px 0 0 0; font-size: 14px;">Application Confirmation</p>
                    </div>
                    <div style="padding: 25px; background-color: #ffffff;">
                        <p>Dear <strong>${applicantName}</strong>,</p>
                        
                        <p>Thank you for taking the time to apply for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong> through KaziHub Kenya.</p>
                        
                        <p>We have successfully received your application materials and profile details. Our hiring team is currently reviewing all candidate submissions.</p>
                        
                        <div style="background-color: #f8f9fa; border-left: 4px solid #1a365d; padding: 15px; margin: 20px 0; border-radius: 4px;">
                            <p style="margin: 0; font-style: italic; color: #2c3e50;">
                                "Every great career journey starts with a single bold step. We are excited about your potential contribution to this role and encourage you to remain hopeful while our review process is underway."
                            </p>
                        </div>

                        <p>If your qualifications align with our requirements, our team will contact you via phone (<strong>${applicantPhone}</strong>) or email to schedule the next steps in the recruitment process.</p>
                        
                        <p style="margin-top: 25px;">Best of luck with your job search,</p>
                        <p style="margin: 0;"><strong>The Recruitment Team</strong><br>KaziHub Kenya</p>
                    </div>
                    <div style="background-color: #f1f1f1; color: #777; text-align: center; padding: 12px; font-size: 12px;">
                        &copy; 2026 KaziHub Kenya | Kilimani, Nairobi, Kenya
                    </div>
                </div>
            `
        };

        let attachments = [];
        if (cvBase64 && cvFileName) {
            attachments.push({
                filename: cvFileName,
                content: cvBase64,
                encoding: 'base64'
            });
        }

        const adminMailOptions = {
            from: '"KaziHub System" <ocholaemmanuelotieno@gmail.com>',
            to: 'ocholaemmanuelotieno@gmail.com',
            subject: `[New Applicant] ${applicantName} applied for ${jobTitle}`,
            html: `
                <h3>New Job Application Received</h3>
                <ul>
                    <li><strong>Candidate:</strong> ${applicantName}</li>
                    <li><strong>Email:</strong> ${applicantEmail}</li>
                    <li><strong>Phone:</strong> ${applicantPhone}</li>
                    <li><strong>Job Applied For:</strong> ${jobTitle} (${companyName})</li>
                    <li><strong>Notes:</strong> ${coverNote || 'N/A'}</li>
                </ul>
            `,
            attachments: attachments
        };

        await transporter.sendMail(applicantMailOptions);
        console.log("✅ Automated confirmation email sent to candidate:", applicantEmail);

        await transporter.sendMail(adminMailOptions);
        console.log("✅ Admin alert email sent successfully.");

        res.status(200).json({ message: 'Application submitted successfully! Check your email inbox for confirmation.' });

    } catch (error) {
        console.error('❌ Error processing application or sending email:', error);
        res.status(500).json({ error: 'Failed to send email. Please check your Gmail App Password configuration in server.js.' });
    }
});