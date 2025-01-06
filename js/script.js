// Main functionality for resume analysis
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const resumeUpload = document.getElementById('resumeUpload');
    const jobDescUpload = document.getElementById('jobDescUpload');
    const resumeFile = document.getElementById('resumeFile');
    const jobDescFile = document.getElementById('jobDescFile');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const results = document.getElementById('results');
    const matchScore = document.getElementById('matchScore');
    const keywordsList = document.getElementById('keywordsList');
    const suggestionsList = document.getElementById('suggestionsList');

    // Upload handlers
    resumeUpload.addEventListener('click', () => resumeFile.click());
    jobDescUpload.addEventListener('click', () => jobDescFile.click());

    // File drag and drop
    [resumeUpload, jobDescUpload].forEach(upload => {
        upload.addEventListener('dragover', (e) => {
            e.preventDefault();
            upload.style.borderColor = '#2563eb';
        });

        upload.addEventListener('dragleave', () => {
            upload.style.borderColor = '#ccc';
        });

        upload.addEventListener('drop', (e) => {
            e.preventDefault();
            upload.style.borderColor = '#ccc';
            const file = e.dataTransfer.files[0];
            handleFileUpload(upload.id === 'resumeUpload' ? resumeFile : jobDescFile, file);
        });
    });

    // File input change handlers
    resumeFile.addEventListener('change', () => {
        handleFileUpload(resumeFile);
        updateUploadBox(resumeUpload, resumeFile.files[0]);
    });

    jobDescFile.addEventListener('change', () => {
        handleFileUpload(jobDescFile);
        updateUploadBox(jobDescUpload, jobDescFile.files[0]);
    });

    // Analyze button click handler
    analyzeBtn.addEventListener('click', async () => {
        if (!resumeFile.files[0] || !jobDescFile.files[0]) {
            alert('Please upload both resume and job description');
            return;
        }

        try {
            // Show loading state
            analyzeBtn.disabled = true;
            analyzeBtn.textContent = 'Analyzing...';

            // Simulate API call with setTimeout
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock analysis results
            const analysisResults = mockAnalyzeResume();
            displayResults(analysisResults);
        } catch (error) {
            console.error('Analysis failed:', error);
            alert('Analysis failed. Please try again.');
        } finally {
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = 'Analyze Resume';
        }
    });

    // Helper functions
    function handleFileUpload(inputElement, file = null) {
        const fileToProcess = file || inputElement.files[0];
        if (fileToProcess) {
            // Here you would typically send the// process file and validate
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
            if (!validTypes.includes(fileToProcess.type)) {
                alert('Please upload a valid file (PDF, DOC, DOCX, or TXT)');
                inputElement.value = '';
                return;
            }
        }
    }

    function updateUploadBox(uploadBox, file) {
        const textElement = uploadBox.querySelector('p');
        if (file) {
            textElement.textContent = `Selected: ${file.name}`;
            uploadBox.style.borderColor = '#2563eb';
        } else {
            textElement.textContent = 'Drop file here or click to upload';
            uploadBox.style.borderColor = '#ccc';
        }
    }

    function mockAnalyzeResume() {
        // Simulate AI analysis results
        return {
            matchScore: Math.floor(Math.random() * 41) + 60, // Score between 60-100
            missingKeywords: [
                'project management',
                'agile methodology',
                'data analysis',
                'team leadership',
                'strategic planning'
            ],
            suggestions: [
                'Add more quantifiable achievements',
                'Include relevant certifications',
                'Highlight leadership experience',
                'Add industry-specific keywords',
                'Improve skills section formatting'
            ]
        };
    }

    function displayResults(results) {
        // Update match score
        matchScore.textContent = `${results.matchScore}%`;
        
        // Update missing keywords
        keywordsList.innerHTML = results.missingKeywords
            .map(keyword => `<li>${keyword}</li>`)
            .join('');
            
        // Update suggestions
        suggestionsList.innerHTML = results.suggestions
            .map(suggestion => `<li>${suggestion}</li>`)
            .join('');
            
        // Show results section
        results.style.display = 'block';
        results.scrollIntoView({ behavior: 'smooth' });
    }
});