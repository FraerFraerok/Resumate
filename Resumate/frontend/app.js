// Основной файл приложения Resumate
console.log('App.js загружен!');

// Глобальные переменные
let currentUser = null;
let resumeData = {
    template: 'modern',
    personal: {},
    experience: [],
    education: [],
    skills: {
        technical: [],
        soft: []
    },
    projects: []
};

// Инициализация приложения
function initApp() {
    console.log('Инициализация приложения...');
    
    // Загружаем сохраненные данные
    loadSavedData();
    
    // Настраиваем обработчики событий
    setupEventListeners();
    
    // Настраиваем конструктор
    setupBuilder();
    
    // Настраиваем авторизацию
    setupAuth();
    
    // Проверяем авторизацию
    checkAuth();
    
    console.log('Приложение инициализировано!');
}

// Загрузка сохраненных данных
function loadSavedData() {
    // Загружаем данные пользователя
    const savedUser = localStorage.getItem('resumate_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }
    
    // Загружаем данные резюме
    const savedResume = localStorage.getItem('resumate_resume_data');
    if (savedResume) {
        resumeData = JSON.parse(savedResume);
    }
}

// Настройка обработчиков событий
function setupEventListeners() {
    console.log('Настройка обработчиков событий...');
    
    // Навигация
    setupNavigation();
    
    // Шаблоны
    setupTemplates();
    
    // Футер
    setupFooter();
}

function setupNavigation() {
    // Логотип - возврат на главную
    const homeLogo = document.getElementById('homeLogo');
    if (homeLogo) {
        homeLogo.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToTop();
        });
    }
    
    // Кнопка "Создать резюме"
    const createBtn = document.getElementById('createBtn');
    if (createBtn) {
        createBtn.addEventListener('click', function() {
            if (currentUser) {
                openBuilder();
            } else {
                showAuthModal('register');
                showNotification('Пожалуйста, зарегистрируйтесь чтобы создать резюме', 'info');
            }
        });
    }
}

function setupTemplates() {
    // Кнопка "Посмотреть шаблоны" в герое
    const templatesBtn = document.getElementById('templatesBtn');
    if (templatesBtn) {
        templatesBtn.addEventListener('click', function() {
            showTemplatesModal();
        });
    }
    
    // Кнопка "Показать все шаблоны"
    const viewAllBtn = document.getElementById('viewAllTemplates');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            showTemplatesModal();
        });
    }
    
    // Кнопка закрытия модалки шаблонов
    const closeTemplatesModal = document.getElementById('closeTemplatesModal');
    if (closeTemplatesModal) {
        closeTemplatesModal.addEventListener('click', function() {
            hideTemplatesModal();
        });
    }
    
    // Клик вне модалки шаблонов
    const templatesModal = document.getElementById('templatesModal');
    if (templatesModal) {
        templatesModal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideTemplatesModal();
            }
        });
    }
}

function setupFooter() {
    // Ссылка на шаблоны в футере
    const showTemplatesFooter = document.getElementById('showTemplatesFooter');
    if (showTemplatesFooter) {
        showTemplatesFooter.addEventListener('click', function(e) {
            e.preventDefault();
            showTemplatesModal();
        });
    }
    
    // Ссылка на тарифы
    const pricingLink = document.getElementById('pricingLink');
    if (pricingLink) {
        pricingLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Информация о тарифах скоро будет доступна!', 'info');
        });
    }
}

// Авторизация
function setupAuth() {
    // Кнопки авторизации
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const closeAuthModal = document.getElementById('closeAuthModal');
    const authModal = document.getElementById('authModal');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            if (currentUser) {
                showUserMenu();
            } else {
                showAuthModal('login');
            }
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            showAuthModal('register');
        });
    }
    
    if (closeAuthModal) {
        closeAuthModal.addEventListener('click', function() {
            hideAuthModal();
        });
    }
    
    if (authModal) {
        authModal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideAuthModal();
            }
        });
    }
    
    // Формы авторизации
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister();
        });
    }
    
    // Табы в модалке
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            switchAuthTab(tab);
        });
    });
}

function checkAuth() {
    // Проверяем токен и обновляем UI
    updateAuthUI();
}

function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (!loginBtn || !registerBtn) return;
    
    if (currentUser) {
        loginBtn.innerHTML = `<i class="fas fa-user"></i> ${currentUser.firstName || 'Профиль'}`;
        loginBtn.classList.remove('btn-outline');
        loginBtn.classList.add('btn-primary');
        registerBtn.style.display = 'none';
    } else {
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Войти';
        loginBtn.classList.remove('btn-primary');
        loginBtn.classList.add('btn-outline');
        registerBtn.style.display = 'inline-flex';
    }
}

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('Пожалуйста, заполните все поля', 'error');
        return;
    }
    
    // Имитация входа
    currentUser = {
        id: Date.now(),
        email: email,
        firstName: email.split('@')[0],
        role: 'user'
    };
    
    localStorage.setItem('resumate_user', JSON.stringify(currentUser));
    
    updateAuthUI();
    hideAuthModal();
    showNotification('Вход выполнен успешно!', 'success');
    
    // Очищаем форму
    document.getElementById('loginForm').reset();
}

function handleRegister() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('userRole').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;
    
    // Валидация
    if (!firstName || !lastName || !email || !password || !confirmPassword || !role) {
        showNotification('Пожалуйста, заполните все обязательные поля', 'error');
        return;
    }
    
    if (password.length < 8) {
        showNotification('Пароль должен содержать минимум 8 символов', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Пароли не совпадают', 'error');
        return;
    }
    
    if (!acceptTerms) {
        showNotification('Необходимо принять условия использования', 'error');
        return;
    }
    
    // Имитация регистрации
    currentUser = {
        id: Date.now(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('resumate_user', JSON.stringify(currentUser));
    
    // Сохраняем имя в данные резюме
    resumeData.personal.fullName = `${lastName} ${firstName}`;
    resumeData.personal.email = email;
    localStorage.setItem('resumate_resume_data', JSON.stringify(resumeData));
    
    updateAuthUI();
    hideAuthModal();
    showNotification('Регистрация прошла успешно! Добро пожаловать в Resumate!', 'success');
    
    // Очищаем форму
    document.getElementById('registerForm').reset();
    
    // Переключаемся на вкладку входа
    switchAuthTab('login');
}

function showAuthModal(defaultTab = 'login') {
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        switchAuthTab(defaultTab);
    }
}

function hideAuthModal() {
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function switchAuthTab(tab) {
    // Обновляем активные табы
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    // Показываем соответствующую форму
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.toggle('active', form.id === `${tab}Form`);
    });
}

// Конструктор резюме
function setupBuilder() {
    // Кнопка возврата на главную
    const backToHome = document.getElementById('backToHome');
    if (backToHome) {
        backToHome.addEventListener('click', function() {
            closeBuilder();
        });
    }
    
    // Кнопка сохранения
    const saveResumeBtn = document.getElementById('saveResumeBtn');
    if (saveResumeBtn) {
        saveResumeBtn.addEventListener('click', function() {
            saveResume();
        });
    }
    
    // Кнопка предпросмотра
    const previewBtn = document.getElementById('previewBtn');
    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            updateResumePreview();
        });
    }
    
    // Кнопка обновления предпросмотра
    const refreshPreviewBtn = document.getElementById('refreshPreviewBtn');
    if (refreshPreviewBtn) {
        refreshPreviewBtn.addEventListener('click', function() {
            updateResumePreview();
        });
    }
    
    // Кнопка экспорта в PDF
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            exportToPDF();
        });
    }
    
    // Селектор шаблонов
    const templateSelect = document.getElementById('templateSelect');
    if (templateSelect) {
        templateSelect.addEventListener('change', function() {
            if (templates) {
                templates.currentTemplate = this.value;
                updateResumePreview();
            }
        });
    }
    
    // Вкладки редактора
    setupEditorTabs();
    
    // Динамические поля
    setupDynamicFields();
    
    // Навыки
    setupSkills();
    
    // Слушатели для полей ввода
    setupFormListeners();
}

function setupEditorTabs() {
    const tabs = document.querySelectorAll('.editor-tab');
    const sections = document.querySelectorAll('.editor-section');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Обновляем активные табы
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Показываем соответствующую секцию
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${tabName}Section`) {
                    section.classList.add('active');
                }
            });
        });
    });
}

function setupDynamicFields() {
    // Опыт работы
    const addExperienceBtn = document.getElementById('addExperienceBtn');
    if (addExperienceBtn) {
        addExperienceBtn.addEventListener('click', addExperienceField);
    }
    
    // Образование
    const addEducationBtn = document.getElementById('addEducationBtn');
    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', addEducationField);
    }
    
    // Проекты
    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', addProjectField);
    }
    
    // Удаление элементов
    setupRemoveButtons();
}

function addExperienceField() {
    const container = document.getElementById('experienceContainer');
    const newIndex = container.children.length + 1;
    
    const newField = document.createElement('div');
    newField.className = 'experience-item';
    newField.innerHTML = `
        <div class="form-group">
            <label>Должность *</label>
            <input type="text" class="exp-position" placeholder="Senior Frontend Developer" required>
        </div>
        <div class="form-group">
            <label>Компания *</label>
            <input type="text" class="exp-company" placeholder="TechCompany Inc." required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Дата начала *</label>
                <input type="month" class="exp-start" required>
            </div>
            <div class="form-group">
                <label>Дата окончания</label>
                <input type="month" class="exp-end">
                <label class="checkbox" style="margin-top: 5px;">
                    <input type="checkbox" class="exp-current"> По настоящее время
                </label>
            </div>
        </div>
        <div class="form-group">
            <label>Местоположение</label>
            <input type="text" class="exp-location" placeholder="Москва, Россия">
        </div>
        <div class="form-group">
            <label>Описание обязанностей и достижений *</label>
            <textarea class="exp-description" rows="4" placeholder="• Разработка SPA приложений на React
• Оптимизация производительности на 40%
• Наставничество junior разработчиков" required></textarea>
        </div>
        <button type="button" class="btn btn-outline btn-sm remove-experience">
            <i class="fas fa-trash"></i> Удалить
        </button>
        <hr>
    `;
    
    container.appendChild(newField);
    
    // Добавляем обработчики для новых полей
    setupRemoveButtons();
    setupFormListeners();
}

function addEducationField() {
    const container = document.getElementById('educationContainer');
    
    const newField = document.createElement('div');
    newField.className = 'education-item';
    newField.innerHTML = `
        <div class="form-group">
            <label>Учебное заведение *</label>
            <input type="text" class="edu-institution" placeholder="Московский Государственный Университет" required>
        </div>
        <div class="form-group">
            <label>Степень/Специальность *</label>
            <input type="text" class="edu-degree" placeholder="Бакалавр компьютерных наук" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Год начала</label>
                <input type="number" class="edu-start" placeholder="2015" min="1900" max="2099">
            </div>
            <div class="form-group">
                <label>Год окончания</label>
                <input type="number" class="edu-end" placeholder="2019" min="1900" max="2099">
            </div>
        </div>
        <div class="form-group">
            <label>Дополнительная информация</label>
            <textarea class="edu-details" rows="3" placeholder="Курсовые проекты, достижения, средний балл"></textarea>
        </div>
        <button type="button" class="btn btn-outline btn-sm remove-education">
            <i class="fas fa-trash"></i> Удалить
        </button>
        <hr>
    `;
    
    container.appendChild(newField);
    
    setupRemoveButtons();
    setupFormListeners();
}

function addProjectField() {
    const container = document.getElementById('projectsContainer');
    
    const newField = document.createElement('div');
    newField.className = 'project-item';
    newField.innerHTML = `
        <div class="form-group">
            <label>Название проекта *</label>
            <input type="text" class="project-name" placeholder="Система управления задачами" required>
        </div>
        <div class="form-group">
            <label>Роль в проекте</label>
            <input type="text" class="project-role" placeholder="Frontend Developer">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Дата начала</label>
                <input type="month" class="project-start">
            </div>
            <div class="form-group">
                <label>Дата окончания</label>
                <input type="month" class="project-end">
            </div>
        </div>
        <div class="form-group">
            <label>Ссылка на проект</label>
            <input type="url" class="project-url" placeholder="https://github.com/username/project">
        </div>
        <div class="form-group">
            <label>Описание проекта *</label>
            <textarea class="project-description" rows="4" placeholder="Разработал SPA приложение для управления задачами с использованием React и Redux..." required></textarea>
        </div>
        <div class="form-group">
            <label>Технологии</label>
            <input type="text" class="project-tech" placeholder="React, TypeScript, Node.js">
        </div>
        <button type="button" class="btn btn-outline btn-sm remove-project">
            <i class="fas fa-trash"></i> Удалить
        </button>
        <hr>
    `;
    
    container.appendChild(newField);
    
    setupRemoveButtons();
    setupFormListeners();
}

function setupRemoveButtons() {
    // Опыт работы
    document.querySelectorAll('.remove-experience').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.experience-item').remove();
        });
    });
    
    // Образование
    document.querySelectorAll('.remove-education').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.education-item').remove();
        });
    });
    
    // Проекты
    document.querySelectorAll('.remove-project').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.project-item').remove();
        });
    });
}

function setupSkills() {
    // Технические навыки
    const addTechSkillBtn = document.getElementById('addTechSkill');
    const techSkillsInput = document.getElementById('techSkillsInput');
    const techSkillsTags = document.getElementById('techSkillsTags');
    
    if (addTechSkillBtn && techSkillsInput && techSkillsTags) {
        addTechSkillBtn.addEventListener('click', function() {
            addSkill(techSkillsInput, techSkillsTags, 'technical');
        });
        
        techSkillsInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkill(techSkillsInput, techSkillsTags, 'technical');
            }
        });
    }
    
    // Профессиональные навыки
    const addSoftSkillBtn = document.getElementById('addSoftSkill');
    const softSkillsInput = document.getElementById('softSkillsInput');
    const softSkillsTags = document.getElementById('softSkillsTags');
    
    if (addSoftSkillBtn && softSkillsInput && softSkillsTags) {
        addSoftSkillBtn.addEventListener('click', function() {
            addSkill(softSkillsInput, softSkillsTags, 'soft');
        });
        
        softSkillsInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkill(softSkillsInput, softSkillsTags, 'soft');
            }
        });
    }
}

function addSkill(inputElement, tagsContainer, skillType) {
    const skill = inputElement.value.trim();
    if (!skill) return;
    
    // Проверяем, не добавлен ли уже такой навык
    const existingSkills = Array.from(tagsContainer.querySelectorAll('.skill-tag span')).map(span => span.textContent);
    if (existingSkills.includes(skill)) {
        showNotification('Этот навык уже добавлен', 'info');
        return;
    }
    
    const skillTag = document.createElement('div');
    skillTag.className = 'skill-tag';
    skillTag.innerHTML = `
        <span>${skill}</span>
        <i class="fas fa-times remove-skill" onclick="this.parentElement.remove();"></i>
    `;
    
    tagsContainer.appendChild(skillTag);
    inputElement.value = '';
    
    // Сохраняем в данные
    if (skillType === 'technical') {
        if (!resumeData.skills.technical.includes(skill)) {
            resumeData.skills.technical.push(skill);
        }
    } else {
        if (!resumeData.skills.soft.includes(skill)) {
            resumeData.skills.soft.push(skill);
        }
    }
    
    saveResumeData();
}

function setupFormListeners() {
    // Основные поля
    const mainFields = ['fullName', 'position', 'email', 'phone', 'city', 'country', 'linkedin', 'summary'];
    mainFields.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.addEventListener('input', function() {
                saveFormData();
                updateResumePreview();
            });
        }
    });
    
    // Динамические поля
    const dynamicSelectors = [
        '.exp-position', '.exp-company', '.exp-start', '.exp-end', '.exp-location', '.exp-description',
        '.edu-institution', '.edu-degree', '.edu-start', '.edu-end', '.edu-details',
        '.project-name', '.project-role', '.project-start', '.project-end', '.project-url', '.project-description', '.project-tech'
    ];
    
    dynamicSelectors.forEach(selector => {
        document.addEventListener('input', function(e) {
            if (e.target.matches(selector)) {
                saveFormData();
                updateResumePreview();
            }
        });
    });
}

function saveFormData() {
    // Сохраняем основные данные
    const personal = {};
    const mainFields = ['fullName', 'position', 'email', 'phone', 'city', 'country', 'linkedin', 'summary'];
    
    mainFields.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            personal[fieldId] = element.value;
        }
    });
    
    resumeData.personal = personal;
    resumeData.template = templates ? templates.currentTemplate : 'modern';
    
    saveResumeData();
}

function saveResumeData() {
    localStorage.setItem('resumate_resume_data', JSON.stringify(resumeData));
}

function openBuilder() {
    const builder = document.getElementById('builder');
    if (builder) {
        builder.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Загружаем данные в форму
        loadFormData();
        
        // Обновляем предпросмотр
        updateResumePreview();
    }
}

function closeBuilder() {
    const builder = document.getElementById('builder');
    if (builder) {
        builder.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function loadFormData() {
    // Личная информация
    const personal = resumeData.personal || {};
    document.getElementById('fullName').value = personal.fullName || '';
    document.getElementById('position').value = personal.position || '';
    document.getElementById('email').value = personal.email || '';
    document.getElementById('phone').value = personal.phone || '';
    document.getElementById('city').value = personal.city || '';
    document.getElementById('country').value = personal.country || '';
    document.getElementById('linkedin').value = personal.linkedin || '';
    document.getElementById('summary').value = personal.summary || '';
    
    // Навыки
    const techSkillsTags = document.getElementById('techSkillsTags');
    const softSkillsTags = document.getElementById('softSkillsTags');
    
    if (techSkillsTags && resumeData.skills.technical) {
        techSkillsTags.innerHTML = resumeData.skills.technical.map(skill => `
            <div class="skill-tag">
                <span>${skill}</span>
                <i class="fas fa-times remove-skill" onclick="this.parentElement.remove();"></i>
            </div>
        `).join('');
    }
    
    if (softSkillsTags && resumeData.skills.soft) {
        softSkillsTags.innerHTML = resumeData.skills.soft.map(skill => `
            <div class="skill-tag">
                <span>${skill}</span>
                <i class="fas fa-times remove-skill" onclick="this.parentElement.remove();"></i>
            </div>
        `).join('');
    }
}

function updateResumePreview() {
    if (templates) {
        templates.updateResumePreview();
    }
}

function saveResume() {
    saveFormData();
    showNotification('Резюме сохранено успешно!', 'success');
}

function exportToPDF() {
    showNotification('Экспорт в PDF скоро будет доступен!', 'info');
}

function showTemplatesModal() {
    const modal = document.getElementById('templatesModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Загружаем шаблоны
        if (templates) {
            templates.loadAllTemplatesToModal();
        }
    }
}

function hideTemplatesModal() {
    const modal = document.getElementById('templatesModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function showUserMenu() {
    const menu = document.createElement('div');
    menu.className = 'user-menu';
    menu.style.cssText = `
        position: absolute;
        top: 70px;
        right: 20px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        padding: 15px;
        min-width: 250px;
        z-index: 1000;
        border: 1px solid var(--border);
    `;
    
    menu.innerHTML = `
    <div style="padding: 10px 0; border-bottom: 1px solid #eee; margin-bottom: 10px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #10b981, #0d9488); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">
                <i class="fas fa-user"></i>
            </div>
            <div>
                <strong>${currentUser.firstName} ${currentUser.lastName || ''}</strong>
                <p style="color: #666; font-size: 0.9rem; margin-top: 2px;">${currentUser.email}</p>
            </div>
        </div>
    </div>
    <button id="myResumesBtn" style="width: 100%; text-align: left; padding: 12px; background: none; border: none; cursor: pointer; border-radius: 5px; display: flex; align-items: center; gap: 10px; transition: background 0.3s;">
        <i class="fas fa-file-alt" style="color: #10b981;"></i>
        <span>Мои резюме</span>
    </button>
    <button id="logoutBtn" style="width: 100%; text-align: left; padding: 12px; background: none; border: none; cursor: pointer; border-radius: 5px; display: flex; align-items: center; gap: 10px; color: #e74c3c; transition: background 0.3s;">
        <i class="fas fa-sign-out-alt"></i>
        <span>Выйти</span>
    </button>
`;
    
    document.body.appendChild(menu);
    
    // Обработчики меню
    document.getElementById('myResumesBtn').addEventListener('click', function() {
        openBuilder();
        menu.remove();
    });
    
    document.getElementById('logoutBtn').addEventListener('click', function() {
        currentUser = null;
        localStorage.removeItem('resumate_user');
        updateAuthUI();
        showNotification('Вы вышли из системы', 'success');
        menu.remove();
    });
    
    // Закрытие меню при клике вне его
    setTimeout(() => {
        const closeMenuHandler = function(e) {
            if (!menu.contains(e.target) && e.target.id !== 'loginBtn') {
                menu.remove();
                document.removeEventListener('click', closeMenuHandler);
            }
        };
        document.addEventListener('click', closeMenuHandler);
    }, 10);
}

function showNotification(message, type = 'success') {
    // Удаляем старые уведомления
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Автоудаление через 5 секунд
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Делаем функции доступными глобально
window.showTemplatesModal = showTemplatesModal;
window.hideTemplatesModal = hideTemplatesModal;
window.openBuilder = openBuilder;

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initApp);