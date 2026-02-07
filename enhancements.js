// JSON-to-Types Enhancements
// Add this code to the existing index.html <script> section

// ==================== ENHANCED EXAMPLES ====================
const enhancedJSONExamples = {
    // Beginner Level
    simpleUser: {
        level: 'beginner',
        label: '🟢 Simple User',
        description: 'Basic user object',
        json: {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            active: true
        }
    },
    
    product: {
        level: 'beginner',
        label: '🟢 Product',
        description: 'E-commerce product',
        json: {
            id: "prod_123",
            name: "Wireless Mouse",
            price: 29.99,
            inStock: true,
            tags: ["electronics", "accessories"]
        }
    },
    
    // Intermediate Level
    nestedUser: {
        level: 'intermediate',
        label: '🟡 Nested User',
        description: 'User with nested objects',
        json: {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            profile: {
                avatar: "https://example.com/avatar.jpg",
                bio: "Software developer",
                location: "San Francisco, CA"
            },
            settings: {
                notifications: true,
                theme: "dark",
                language: "en"
            },
            createdAt: "2024-01-15T10:30:00Z"
        }
    },
    
    apiResponse: {
        level: 'intermediate',
        label: '🟡 API Response',
        description: 'Paginated API response',
        json: {
            data: [
                { id: 1, title: "First Post", author: "Alice" },
                { id: 2, title: "Second Post", author: "Bob" }
            ],
            meta: {
                page: 1,
                per_page: 20,
                total: 100,
                total_pages: 5
            },
            links: {
                self: "/api/posts?page=1",
                next: "/api/posts?page=2",
                last: "/api/posts?page=5"
            }
        }
    },
    
    arrayOfObjects: {
        level: 'intermediate',
        label: '🟡 Array of Objects',
        description: 'List of users',
        json: [
            { id: 1, name: "Alice", role: "admin" },
            { id: 2, name: "Bob", role: "user" },
            { id: 3, name: "Charlie", role: "moderator" }
        ]
    },
    
    // Advanced Level
    ecommerceOrder: {
        level: 'advanced',
        label: '🔴 E-commerce Order',
        description: 'Complex order structure',
        json: {
            order_id: "ORD-2024-001",
            customer: {
                id: 123,
                name: "John Doe",
                email: "john@example.com",
                phone: "+1-555-0123"
            },
            items: [
                {
                    product_id: "prod_001",
                    name: "Wireless Mouse",
                    quantity: 2,
                    price: 29.99,
                    subtotal: 59.98
                },
                {
                    product_id: "prod_002",
                    name: "Keyboard",
                    quantity: 1,
                    price: 79.99,
                    subtotal: 79.99
                }
            ],
            shipping: {
                method: "express",
                cost: 15.00,
                address: {
                    street: "123 Main St",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94102",
                    country: "US"
                },
                tracking_number: "1Z999AA10123456784"
            },
            payment: {
                method: "credit_card",
                status: "paid",
                amount: 154.97,
                currency: "USD",
                transaction_id: "txn_abc123"
            },
            status: "processing",
            created_at: "2024-02-08T10:30:00Z",
            updated_at: "2024-02-08T10:35:00Z"
        }
    },
    
    githubRepo: {
        level: 'advanced',
        label: '🔴 GitHub Repository',
        description: 'Real API response',
        json: {
            id: 123456789,
            node_id: "MDEwOlJlcG9zaXRvcnkxMjM0NTY3ODk=",
            name: "awesome-project",
            full_name: "user/awesome-project",
            private: false,
            owner: {
                login: "user",
                id: 12345,
                avatar_url: "https://avatars.githubusercontent.com/u/12345",
                type: "User"
            },
            description: "An awesome project",
            fork: false,
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-02-08T10:00:00Z",
            pushed_at: "2024-02-08T09:50:00Z",
            size: 1234,
            stargazers_count: 42,
            watchers_count: 42,
            language: "TypeScript",
            has_issues: true,
            has_projects: true,
            has_downloads: true,
            has_wiki: true,
            has_pages: false,
            forks_count: 5,
            open_issues_count: 3,
            license: {
                key: "mit",
                name: "MIT License",
                spdx_id: "MIT",
                url: "https://api.github.com/licenses/mit"
            },
            topics: ["javascript", "typescript", "nodejs"],
            visibility: "public",
            default_branch: "main"
        }
    },
    
    configFile: {
        level: 'advanced',
        label: '🔴 Config File',
        description: 'Application configuration',
        json: {
            app: {
                name: "MyApp",
                version: "1.0.0",
                environment: "production"
            },
            server: {
                host: "0.0.0.0",
                port: 3000,
                ssl: {
                    enabled: true,
                    cert: "/path/to/cert.pem",
                    key: "/path/to/key.pem"
                }
            },
            database: {
                host: "localhost",
                port: 5432,
                name: "myapp_db",
                pool: {
                    min: 2,
                    max: 10
                }
            },
            redis: {
                host: "localhost",
                port: 6379,
                password: null,
                db: 0
            },
            logging: {
                level: "info",
                format: "json",
                outputs: ["console", "file"]
            },
            features: {
                authentication: true,
                analytics: false,
                beta_features: ["feature_a", "feature_b"]
            }
        }
    }
};

// ==================== TOAST NOTIFICATION SYSTEM ====================
class ToastManager {
    constructor() {
        if (window.toast) return window.toast;
        this.container = this.createContainer();
        document.body.appendChild(this.container);
        window.toast = this;
    }
    
    createContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        return container;
    }
    
    show(message, type = 'success', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };
        
        const colors = {
            success: '#3fb950',
            error: '#f85149',
            warning: '#d29922',
            info: '#58a6ff'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type]}</span>
            <span class="toast-message">${message}</span>
        `;
        
        toast.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 20px;
            background: ${colors[type]};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            font-size: 14px;
            font-weight: 500;
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            pointer-events: auto;
            max-width: 350px;
        `;
        
        this.container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, duration);
        
        return toast;
    }
    
    success(message) { return this.show(message, 'success'); }
    error(message) { return this.show(message, 'error'); }
    warning(message) { return this.show(message, 'warning'); }
    info(message) { return this.show(message, 'info'); }
}

const toast = new ToastManager();

// ==================== FORMAT JSON BUTTON ====================
function addFormatJSONButton() {
    const inputPanel = document.querySelector('.panel:first-child .panel-header');
    if (!inputPanel) return;
    
    const formatBtn = document.createElement('button');
    formatBtn.textContent = '✨ Format JSON';
    formatBtn.className = 'paste-btn';
    formatBtn.style.cssText = `
        padding: 6px 12px;
        background: var(--bg-tertiary);
        color: var(--text-primary);
        border: 1px solid var(--border-color);
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        transition: all 0.2s;
    `;
    
    formatBtn.addEventListener('mouseenter', () => {
        formatBtn.style.background = 'var(--accent)';
        formatBtn.style.color = 'white';
        formatBtn.style.borderColor = 'var(--accent)';
    });
    
    formatBtn.addEventListener('mouseleave', () => {
        formatBtn.style.background = 'var(--bg-tertiary)';
        formatBtn.style.color = 'var(--text-primary)';
        formatBtn.style.borderColor = 'var(--border-color)';
    });
    
    formatBtn.addEventListener('click', () => {
        const jsonInput = document.getElementById('jsonInput');
        try {
            const parsed = JSON.parse(jsonInput.value);
            jsonInput.value = JSON.stringify(parsed, null, 2);
            toast.success('JSON formatted!');
            
            // Trigger conversion
            const event = new Event('input', { bubbles: true });
            jsonInput.dispatchEvent(event);
        } catch (error) {
            toast.error('Invalid JSON - cannot format');
        }
    });
    
    inputPanel.appendChild(formatBtn);
}

// ==================== ENHANCED ERROR DISPLAY ====================
function displayEnhancedJSONError(error, jsonText) {
    const errorDiv = document.getElementById('error');
    if (!errorDiv) return;
    
    let lineNumber = null;
    let columnNumber = null;
    
    // Try to extract line/column from error message
    const match = error.message.match(/position (\d+)/i) ||
                  error.message.match(/line (\d+)/i);
    
    if (match) {
        const position = parseInt(match[1]);
        const lines = jsonText.substring(0, position).split('\n');
        lineNumber = lines.length;
        columnNumber = lines[lines.length - 1].length;
    }
    
    let suggestions = [
        'Check for missing or extra commas',
        'Ensure all strings are properly quoted with double quotes',
        'Verify all brackets and braces are properly closed',
        'Try one of the example JSONs below to see correct format'
    ];
    
    if (error.message.includes('quote')) {
        suggestions = [
            'Use double quotes (") for strings, not single quotes (\')',
            'Make sure all property names are in double quotes',
            ...suggestions
        ];
    } else if (error.message.includes('comma')) {
        suggestions = [
            'Remove trailing commas after the last property',
            'Add missing commas between properties',
            ...suggestions
        ];
    }
    
    errorDiv.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 8px; color: var(--error-text);">
            ⚠ JSON Parsing Error
            ${lineNumber ? `<span style="font-weight: normal; color: var(--text-secondary);"> at line ${lineNumber}${columnNumber ? `:${columnNumber}` : ''}</span>` : ''}
        </div>
        <div style="margin-bottom: 12px; font-family: monospace; font-size: 13px;">
            ${error.message}
        </div>
        <div style="margin-top: 12px;">
            <strong style="font-size: 13px; color: var(--text-secondary);">💡 Suggestions:</strong>
            <ul style="margin: 8px 0 0 0; padding-left: 20px; color: var(--text-secondary); font-size: 13px;">
                ${suggestions.map(s => `<li style="margin: 4px 0;">${s}</li>`).join('')}
            </ul>
        </div>
    `;
}

// ==================== ENHANCED EXAMPLES ====================
function renderEnhancedJSONExamples() {
    // Find or create examples section
    let examplesSection = document.querySelector('.examples');
    
    if (!examplesSection) {
        examplesSection = document.createElement('div');
        examplesSection.className = 'examples';
        examplesSection.style.cssText = `
            margin-top: 30px;
            padding: 20px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
        `;
        
        const container = document.querySelector('.container');
        container.appendChild(examplesSection);
    }
    
    const categories = {
        beginner: [],
        intermediate: [],
        advanced: []
    };
    
    Object.entries(enhancedJSONExamples).forEach(([key, example]) => {
        categories[example.level].push({ key, ...example });
    });
    
    const levelLabels = {
        beginner: '🟢 Beginner',
        intermediate: '🟡 Intermediate',
        advanced: '🔴 Advanced'
    };
    
    let html = '<h3>Quick Examples</h3>';
    
    Object.entries(categories).forEach(([level, examples]) => {
        if (examples.length === 0) return;
        
        html += `
            <div class="example-category" style="margin-top: 20px;">
                <h4 style="
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--text-secondary);
                    margin-bottom: 10px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                ">${levelLabels[level]}</h4>
                <div class="example-grid" style="
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 10px;
                ">
                    ${examples.map(ex => `
                        <button class="example-btn" data-example="${ex.key}" style="
                            padding: 12px;
                            background: var(--bg-tertiary);
                            border: 1px solid var(--border-color);
                            border-radius: 6px;
                            color: var(--text-primary);
                            cursor: pointer;
                            text-align: left;
                            transition: all 0.2s;
                            font-size: 14px;
                        ">
                            <strong style="display: block; color: var(--accent); margin-bottom: 4px;">
                                ${ex.label}
                            </strong>
                            <span style="font-size: 12px; color: var(--text-secondary);">
                                ${ex.description}
                            </span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    examplesSection.innerHTML = html;
    
    // Attach event listeners
    document.querySelectorAll('.example-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.borderColor = 'var(--accent)';
            btn.style.background = 'var(--bg-primary)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.borderColor = 'var(--border-color)';
            btn.style.background = 'var(--bg-tertiary)';
        });
        
        btn.addEventListener('click', () => {
            const exampleKey = btn.dataset.example;
            const example = enhancedJSONExamples[exampleKey];
            
            const jsonInput = document.getElementById('jsonInput');
            jsonInput.value = JSON.stringify(example.json, null, 2);
            
            // Trigger conversion
            const event = new Event('input', { bubbles: true });
            jsonInput.dispatchEvent(event);
            
            toast.info(`Example loaded: ${example.label}`);
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Flash effect
            jsonInput.style.boxShadow = '0 0 0 3px rgba(88, 166, 255, 0.3)';
            setTimeout(() => {
                jsonInput.style.boxShadow = '';
            }, 600);
        });
    });
}

// ==================== COPY INDIVIDUAL TYPES ====================
function addCopyButtons() {
    const outputBox = document.querySelector('.output-box');
    if (!outputBox) return;
    
    // Add a "Copy All" button if it doesn't exist
    const panelHeader = outputBox.closest('.panel').querySelector('.panel-header');
    
    // Check if copy button already exists
    if (!document.getElementById('copy-all-btn')) {
        const copyAllBtn = document.createElement('button');
        copyAllBtn.id = 'copy-all-btn';
        copyAllBtn.textContent = '📋 Copy All';
        copyAllBtn.className = 'paste-btn';
        copyAllBtn.style.marginLeft = 'auto';
        
        copyAllBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(outputBox.textContent);
                copyAllBtn.textContent = '✓ Copied!';
                copyAllBtn.style.background = 'var(--success)';
                toast.success('All types copied!');
                
                setTimeout(() => {
                    copyAllBtn.textContent = '📋 Copy All';
                    copyAllBtn.style.background = '';
                }, 2000);
            } catch (error) {
                const range = document.createRange();
                range.selectNode(outputBox);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
                toast.success('Types copied!');
            }
        });
        
        panelHeader.appendChild(copyAllBtn);
    }
}

// ==================== KEYBOARD SHORTCUTS ====================
function setupJSONKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd+Shift+F to format JSON
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
            e.preventDefault();
            const formatBtn = document.querySelector('button:contains("Format")');
            if (formatBtn) formatBtn.click();
        }
        
        // Ctrl/Cmd+Shift+C to copy
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            const copyBtn = document.getElementById('copy-all-btn');
            if (copyBtn) copyBtn.click();
        }
    });
}

// ==================== MOBILE RESPONSIVENESS ====================
function addMobileStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .main-grid {
                grid-template-columns: 1fr !important;
            }
            
            .panel-header {
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .format-selector {
                width: 100%;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
            }
            
            .format-btn {
                min-width: 90px;
                white-space: nowrap;
            }
            
            textarea, .output-box {
                font-size: 13px !important;
                min-height: 300px !important;
            }
            
            .example-grid {
                grid-template-columns: 1fr !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== INITIALIZATION ====================
function initJSONEnhancements() {
    // Add format button
    addFormatJSONButton();
    
    // Render enhanced examples
    renderEnhancedJSONExamples();
    
    // Add copy buttons
    addCopyButtons();
    
    // Setup keyboard shortcuts
    setupJSONKeyboardShortcuts();
    
    // Add mobile styles
    addMobileStyles();
    
    console.log('✓ JSON-to-Types enhancements loaded');
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initJSONEnhancements);
} else {
    initJSONEnhancements();
}
