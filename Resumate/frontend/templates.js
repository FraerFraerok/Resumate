// Модуль шаблонов резюме с разными стилями
class Templates {
    constructor() {
        console.log('Templates модуль загружен!');
        this.templates = this.getTemplatesData();
        this.currentTemplate = 'modern';
        this.userData = this.loadUserData();
    }
    
    getTemplatesData() {
        return [
            {
                id: 'modern',
                name: 'Современный',
                category: 'modern',
                description: 'Чистый современный дизайн для IT-специалистов',
                color: 'linear-gradient(135deg, #10b981, #0d9488)',
                icon: 'fas fa-desktop',
                tags: ['IT', 'Разработка', 'Современный'],
                premium: false
            },
            {
                id: 'classic',
                name: 'Классический',
                category: 'classic',
                description: 'Традиционный формат для консервативных компаний',
                color: 'linear-gradient(135deg, #1e293b, #475569)',
                icon: 'fas fa-briefcase',
                tags: ['Классика', 'Формальный', 'Корпоративный'],
                premium: false
            },
            {
                id: 'minimal',
                name: 'Минималистичный',
                category: 'minimal',
                description: 'Простой и элегантный дизайн без лишних деталей',
                color: 'linear-gradient(135deg, #06d6a0, #0d9488)',
                icon: 'fas fa-minus',
                tags: ['Минимализм', 'Элегантный', 'Чистый'],
                premium: false
            },
            {
                id: 'creative',
                name: 'Креативный',
                category: 'creative',
                description: 'Яркий дизайн для дизайнеров и креативных специалистов',
                color: 'linear-gradient(135deg, #06d6a0, #0891b2)',
                icon: 'fas fa-palette',
                tags: ['Дизайн', 'Креатив', 'Яркий'],
                premium: false
            },
            {
                id: 'professional',
                name: 'Профессиональный',
                category: 'classic',
                description: 'Строгий формат для руководителей и менеджеров',
                color: 'linear-gradient(135deg, #059669, #0f766e)',
                icon: 'fas fa-user-tie',
                tags: ['Бизнес', 'Профессиональный', 'Руководство'],
                premium: false
            },
            {
                id: 'tech',
                name: 'Технический',
                category: 'modern',
                description: 'Фокус на технических навыках и проектах',
                color: 'linear-gradient(135deg, #059669, #0891b2)',
                icon: 'fas fa-code',
                tags: ['Технический', 'Разработка', 'Инженер'],
                premium: false
            },
            {
                id: 'academic',
                name: 'Академический',
                category: 'classic',
                description: 'Для научных сотрудников и исследователей',
                color: 'linear-gradient(135deg, #0d9488, #0891b2)',
                icon: 'fas fa-graduation-cap',
                tags: ['Наука', 'Исследования', 'Образование'],
                premium: false
            },
            {
                id: 'startup',
                name: 'Стартап',
                category: 'creative',
                description: 'Динамичный дизайн для предпринимателей',
                color: 'linear-gradient(135deg, #06d6a0, #3b82f6)',
                icon: 'fas fa-rocket',
                tags: ['Стартап', 'Предпринимательство', 'Динамичный'],
                premium: false
            },
            {
                id: 'executive',
                name: 'Executive',
                category: 'classic',
                description: 'Премиум шаблон для топ-менеджеров',
                color: 'linear-gradient(135deg, #064e3b, #0f766e)',
                icon: 'fas fa-crown',
                tags: ['Премиум', 'Руководство', 'Элитный'],
                premium: true
            },
            {
                id: 'portfolio',
                name: 'Портфолио',
                category: 'creative',
                description: 'Для дизайнеров с акцентом на визуальное портфолио',
                color: 'linear-gradient(135deg, #06d6a0, #0ea5e9)',
                icon: 'fas fa-images',
                tags: ['Дизайн', 'Портфолио', 'Визуальный'],
                premium: false
            }
        ];
    }
    
    loadUserData() {
        const saved = localStorage.getItem('resumate_user_data');
        return saved ? JSON.parse(saved) : {
            personal: {},
            experience: [],
            education: [],
            skills: [],
            projects: []
        };
    }
    
    saveUserData() {
        localStorage.setItem('resumate_user_data', JSON.stringify(this.userData));
    }
    
    // Загрузка шаблонов на главную страницу
    loadTemplatesToGrid() {
        console.log('Загружаю шаблоны на главную...');
        const grid = document.getElementById('templatesGrid');
        if (!grid) {
            console.error('Не найден элемент templatesGrid!');
            return;
        }
        
        // Берем только первые 6 шаблонов для главной
        const mainTemplates = this.templates.slice(0, 6);
        
        grid.innerHTML = mainTemplates.map(template => `
            <div class="template-card" onclick="templates.selectTemplate('${template.id}')">
                <div class="template-preview" style="background: ${template.color}">
                    <div class="template-name">${template.name}</div>
                    ${template.premium ? '<div class="premium-badge"><i class="fas fa-crown"></i> PRO</div>' : ''}
                </div>
                <div class="template-info">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        <i class="${template.icon}" style="color: ${template.color.split(',')[1].trim()}"></i>
                        <h4>${template.name}</h4>
                    </div>
                    <p>${template.description}</p>
                    <div class="template-tags">
                        ${template.tags.map(tag => `<span class="template-tag">${tag}</span>`).join('')}
                    </div>
                    <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); templates.selectTemplate('${template.id}')">
                        Использовать
                    </button>
                </div>
            </div>
        `).join('');
        
        console.log('Шаблоны загружены на главную!');
    }
    
    // Загрузка всех шаблонов в модальное окно
    loadAllTemplatesToModal() {
        console.log('Загружаю ВСЕ шаблоны в модальное окно...');
        const modalGrid = document.getElementById('templatesModalGrid');
        if (!modalGrid) {
            console.error('Не найден элемент templatesModalGrid!');
            return;
        }
        
        modalGrid.innerHTML = this.templates.map(template => `
            <div class="template-card" onclick="templates.selectTemplateFromModal('${template.id}')">
                <div class="template-preview" style="background: ${template.color}">
                    <div class="template-name">${template.name}</div>
                    ${template.premium ? '<div class="premium-badge"><i class="fas fa-crown"></i> PRO</div>' : ''}
                </div>
                <div class="template-info">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        <i class="${template.icon}" style="color: ${template.color.split(',')[1].trim()}"></i>
                        <h4>${template.name}</h4>
                    </div>
                    <p>${template.description}</p>
                    <div class="template-tags">
                        ${template.tags.map(tag => `<span class="template-tag">${tag}</span>`).join('')}
                    </div>
                    <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); templates.selectTemplateFromModal('${template.id}')">
                        <i class="fas fa-check"></i> Выбрать
                    </button>
                </div>
            </div>
        `).join('');
        
        console.log('Все шаблоны загружены в модальное окно!');
        
        // Настройка фильтров
        this.setupTemplateFilters();
    }
    
    setupTemplateFilters() {
        const searchInput = document.getElementById('templateSearch');
        const categorySelect = document.getElementById('templateCategory');
        
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterTemplates());
        }
        
        if (categorySelect) {
            categorySelect.addEventListener('change', () => this.filterTemplates());
        }
    }
    
    filterTemplates() {
        const searchInput = document.getElementById('templateSearch');
        const categorySelect = document.getElementById('templateCategory');
        const searchTerm = searchInput.value.toLowerCase();
        const category = categorySelect.value;
        
        const cards = document.querySelectorAll('.templates-modal-grid .template-card');
        
        cards.forEach(card => {
            const templateId = card.querySelector('button').getAttribute('onclick').match(/'([^']+)'/)[1];
            const template = this.templates.find(t => t.id === templateId);
            
            if (!template) return;
            
            const matchesSearch = template.name.toLowerCase().includes(searchTerm) ||
                                template.description.toLowerCase().includes(searchTerm) ||
                                template.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            
            const matchesCategory = category === 'all' || template.category === category;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    selectTemplate(templateId) {
        console.log('Выбран шаблон на главной:', templateId);
        this.currentTemplate = templateId;
        
        const template = this.templates.find(t => t.id === templateId);
        if (template) {
            this.showNotification(`Выбран шаблон: ${template.name}`, 'success');
            
            // Открываем конструктор
            this.openBuilder();
            
            // Устанавливаем выбранный шаблон в селекторе
            const templateSelect = document.getElementById('templateSelect');
            if (templateSelect) {
                templateSelect.value = templateId;
                // Запускаем событие изменения для обновления предпросмотра
                templateSelect.dispatchEvent(new Event('change'));
            }
        }
    }
    
    selectTemplateFromModal(templateId) {
        console.log('Выбран шаблон из модалки:', templateId);
        this.currentTemplate = templateId;
        
        const template = this.templates.find(t => t.id === templateId);
        if (template) {
            this.showNotification(`Выбран шаблон: ${template.name}`, 'success');
            
            // Закрываем модальное окно
            this.hideTemplatesModal();
            
            // Открываем конструктор
            this.openBuilder();
            
            // Устанавливаем выбранный шаблон в селекторе
            const templateSelect = document.getElementById('templateSelect');
            if (templateSelect) {
                templateSelect.value = templateId;
                templateSelect.dispatchEvent(new Event('change'));
            }
        }
    }
    
    openBuilder() {
        const builder = document.getElementById('builder');
        if (builder) {
            builder.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Загружаем данные пользователя в форму
            this.loadDataToForm();
            
            // Обновляем предпросмотр
            this.updateResumePreview();
        }
    }
    
    hideTemplatesModal() {
        const modal = document.getElementById('templatesModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    loadDataToForm() {
        // Личная информация
        const personal = this.userData.personal || {};
        document.getElementById('fullName').value = personal.fullName || '';
        document.getElementById('position').value = personal.position || '';
        document.getElementById('email').value = personal.email || '';
        document.getElementById('phone').value = personal.phone || '';
        document.getElementById('city').value = personal.city || '';
        document.getElementById('country').value = personal.country || '';
        document.getElementById('linkedin').value = personal.linkedin || '';
        document.getElementById('summary').value = personal.summary || '';
    }
    
    updateResumePreview() {
        const preview = document.getElementById('resumePreview');
        if (!preview) return;
        
        // Получаем данные из формы
        const formData = this.getFormData();
        
        // Генерируем HTML для выбранного шаблона
        const templateHtml = this.generateTemplateHTML(this.currentTemplate, formData);
        
        preview.innerHTML = templateHtml;
    }
    
    getFormData() {
        return {
            personal: {
                fullName: document.getElementById('fullName').value,
                position: document.getElementById('position').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                city: document.getElementById('city').value,
                country: document.getElementById('country').value,
                linkedin: document.getElementById('linkedin').value,
                summary: document.getElementById('summary').value
            },
            template: this.currentTemplate
        };
    }
    
    generateTemplateHTML(templateId, data) {
        const personal = data.personal;
        
        switch(templateId) {
            case 'modern':
                return this.generateModernTemplate(personal);
            case 'classic':
                return this.generateClassicTemplate(personal);
            case 'minimal':
                return this.generateMinimalTemplate(personal);
            case 'creative':
                return this.generateCreativeTemplate(personal);
            default:
                return this.generateModernTemplate(personal);
        }
    }
    
    generateModernTemplate(personal) {
        return `
            <div class="resume-preview-template template-modern">
                <div class="modern-header" style="background: linear-gradient(135deg, #10b981, #0d9488);">
                    <h1 style="margin: 0 0 10px 0; font-size: 2.5rem;">${personal.fullName || 'Иванов Иван Иванович'}</h1>
                    <h2 style="margin: 0; font-weight: 400; opacity: 0.9;">${personal.position || 'Senior Frontend Developer'}</h2>
                </div>
                
                <div style="padding: 30px;">
                    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px; margin-bottom: 30px;">
                        <div>
                            <h3 style="color: #10b981; margin-bottom: 15px; border-bottom: 2px solid #10b981; padding-bottom: 5px;">Контакты</h3>
                            ${personal.email ? `<p><i class="fas fa-envelope"></i> ${personal.email}</p>` : ''}
                            ${personal.phone ? `<p><i class="fas fa-phone"></i> ${personal.phone}</p>` : ''}
                            ${personal.city ? `<p><i class="fas fa-map-marker-alt"></i> ${personal.city}, ${personal.country || ''}</p>` : ''}
                            ${personal.linkedin ? `<p><i class="fab fa-linkedin"></i> ${personal.linkedin}</p>` : ''}
                        </div>
                        
                        <div>
                            <h3 style="color: #10b981; margin-bottom: 15px; border-bottom: 2px solid #10b981; padding-bottom: 5px;">О себе</h3>
                            <p>${personal.summary || 'Опытный IT-специалист с глубокими знаниями в разработке программного обеспечения.'}</p>
                        </div>
                    </div>
                    
                    <div style="background: #f0fdf9; padding: 20px; border-radius: 8px;">
                        <h3 style="color: #10b981; margin-bottom: 15px;">Навыки</h3>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                            <span style="background: #10b981; color: white; padding: 8px 16px; border-radius: 20px;">JavaScript</span>
                            <span style="background: #10b981; color: white; padding: 8px 16px; border-radius: 20px;">React</span>
                            <span style="background: #10b981; color: white; padding: 8px 16px; border-radius: 20px;">TypeScript</span>
                            <span style="background: #10b981; color: white; padding: 8px 16px; border-radius: 20px;">Node.js</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateClassicTemplate(personal) {
        return `
            <div class="resume-preview-template template-classic">
                <div class="classic-header">
                    <h1 style="margin: 0 0 5px 0; font-size: 2.2rem; color: #2d3748;">${personal.fullName || 'Иванов Иван Иванович'}</h1>
                    <h2 style="margin: 0; font-weight: 400; color: #4a5568;">${personal.position || 'Senior Frontend Developer'}</h2>
                </div>
                
                <div style="padding: 25px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
                        <div>
                            <h3 style="color: #2d3748; margin-bottom: 10px; font-size: 1.1rem;">Контактная информация</h3>
                            <div style="color: #4a5568;">
                                ${personal.email ? `<p style="margin: 5px 0;"><strong>Email:</strong> ${personal.email}</p>` : ''}
                                ${personal.phone ? `<p style="margin: 5px 0;"><strong>Телефон:</strong> ${personal.phone}</p>` : ''}
                                ${personal.city ? `<p style="margin: 5px 0;"><strong>Местоположение:</strong> ${personal.city}, ${personal.country || ''}</p>` : ''}
                            </div>
                        </div>
                        
                        <div>
                            <h3 style="color: #2d3748; margin-bottom: 10px; font-size: 1.1rem;">Профессиональное резюме</h3>
                            <p style="color: #4a5568;">${personal.summary || 'Целеустремленный IT-специалист с подтвержденным опытом успешной работы над сложными проектами.'}</p>
                        </div>
                    </div>
                    
                    <div>
                        <h3 style="color: #2d3748; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 15px;">Ключевые навыки</h3>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            <span style="border: 1px solid #2d3748; color: #2d3748; padding: 6px 12px; border-radius: 4px;">JavaScript</span>
                            <span style="border: 1px solid #2d3748; color: #2d3748; padding: 6px 12px; border-radius: 4px;">React</span>
                            <span style="border: 1px solid #2d3748; color: #2d3748; padding: 6px 12px; border-radius: 4px;">TypeScript</span>
                            <span style="border: 1px solid #2d3748; color: #2d3748; padding: 6px 12px; border-radius: 4px;">Node.js</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateMinimalTemplate(personal) {
        return `
            <div class="resume-preview-template template-minimal">
                <div class="minimal-header">
                    <h1 style="margin: 0 0 10px 0; font-size: 2.8rem; color: #2d3748; font-weight: 300;">${personal.fullName || 'Иванов Иван Иванович'}</h1>
                    <h2 style="margin: 0; font-weight: 400; color: #4cc9f0;">${personal.position || 'Senior Frontend Developer'}</h2>
                </div>
                
                <div style="padding: 30px; max-width: 800px; margin: 0 auto;">
                    <div style="margin-bottom: 30px;">
                        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px; margin-bottom: 20px;">
                            ${personal.email ? `<div style="flex: 1; min-width: 200px;"><i class="fas fa-envelope" style="color: #4cc9f0; margin-right: 10px;"></i>${personal.email}</div>` : ''}
                            ${personal.phone ? `<div style="flex: 1; min-width: 200px;"><i class="fas fa-phone" style="color: #4cc9f0; margin-right: 10px;"></i>${personal.phone}</div>` : ''}
                            ${personal.city ? `<div style="flex: 1; min-width: 200px;"><i class="fas fa-map-marker-alt" style="color: #4cc9f0; margin-right: 10px;"></i>${personal.city}</div>` : ''}
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <h3 style="color: #2d3748; margin-bottom: 15px; font-weight: 400;">Обо мне</h3>
                        <p style="color: #4a5568; line-height: 1.6;">${personal.summary || 'Профессионал в области разработки программного обеспечения с фокусом на создание качественных и масштабируемых решений.'}</p>
                    </div>
                    
                    <div>
                        <h3 style="color: #2d3748; margin-bottom: 15px; font-weight: 400;">Навыки</h3>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                            <span style="background: #f0f9ff; color: #4cc9f0; padding: 8px 16px; border-radius: 20px; border: 1px solid #4cc9f0;">JavaScript</span>
                            <span style="background: #f0f9ff; color: #4cc9f0; padding: 8px 16px; border-radius: 20px; border: 1px solid #4cc9f0;">React</span>
                            <span style="background: #f0f9ff; color: #4cc9f0; padding: 8px 16px; border-radius: 20px; border: 1px solid #4cc9f0;">TypeScript</span>
                            <span style="background: #f0f9ff; color: #4cc9f0; padding: 8px 16px; border-radius: 20px; border: 1px solid #4cc9f0;">Node.js</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateCreativeTemplate(personal) {
        return `
            <div class="resume-preview-template template-creative">
                <div style="padding: 30px;">
                    <div style="display: flex; align-items: center; gap: 30px; margin-bottom: 30px; flex-wrap: wrap;">
                        <div style="width: 120px; height: 120px; background: linear-gradient(135deg, #06d6a0, #0891b2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                            ${personal.fullName ? personal.fullName.charAt(0) : 'И'}
                        </div>
                        <div>
                            <h1 style="margin: 0 0 10px 0; font-size: 2.5rem; color: #06d6a0;">${personal.fullName || 'Иванов Иван Иванович'}</h1>
                            <h2 style="margin: 0; font-weight: 400; color: #0891b2;">${personal.position || 'Senior Frontend Developer'}</h2>
                        </div>
                    </div>
                    
                    <div style="background: white; border-radius: 12px; padding: 25px; box-shadow: 0 5px 15px rgba(6, 214, 160, 0.1); margin-bottom: 30px;">
                        <h3 style="color: #06d6a0; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-user"></i> Профиль
                        </h3>
                        <p style="color: #333; line-height: 1.6;">${personal.summary || 'Креативный разработчик с страстью к созданию инновационных решений и пользовательских интерфейсов.'}</p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
                        ${personal.email ? `
                        <div style="background: #f0fdf9; padding: 15px; border-radius: 8px; border-left: 4px solid #06d6a0;">
                            <div style="color: #06d6a0; margin-bottom: 5px;"><i class="fas fa-envelope"></i> Email</div>
                            <div>${personal.email}</div>
                        </div>
                        ` : ''}
                        
                        ${personal.phone ? `
                        <div style="background: #f0fdf9; padding: 15px; border-radius: 8px; border-left: 4px solid #06d6a0;">
                            <div style="color: #06d6a0; margin-bottom: 5px;"><i class="fas fa-phone"></i> Телефон</div>
                            <div>${personal.phone}</div>
                        </div>
                        ` : ''}
                        
                        ${personal.city ? `
                        <div style="background: #f0fdf9; padding: 15px; border-radius: 8px; border-left: 4px solid #06d6a0;">
                            <div style="color: #06d6a0; margin-bottom: 5px;"><i class="fas fa-map-marker-alt"></i> Местоположение</div>
                            <div>${personal.city}</div>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div>
                        <h3 style="color: #06d6a0; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-star"></i> Ключевые компетенции
                        </h3>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                            <span style="background: linear-gradient(135deg, #06d6a0, #0891b2); color: white; padding: 10px 20px; border-radius: 25px; font-weight: 600;">JavaScript</span>
                            <span style="background: linear-gradient(135deg, #06d6a0, #0891b2); color: white; padding: 10px 20px; border-radius: 25px; font-weight: 600;">React</span>
                            <span style="background: linear-gradient(135deg, #06d6a0, #0891b2); color: white; padding: 10px 20px; border-radius: 25px; font-weight: 600;">UI/UX Design</span>
                            <span style="background: linear-gradient(135deg, #06d6a0, #0891b2); color: white; padding: 10px 20px; border-radius: 25px; font-weight: 600;">Creative Thinking</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    showNotification(message, type = 'success') {
        // Удаляем старые уведомления
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Автоудаление через 5 секунд
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Создаем глобальный экземпляр
const templates = new Templates();