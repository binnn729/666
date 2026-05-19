
    // 初始化轮播
    const swiper = new Swiper('.mySwiper', {
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.swiper-pagination', clickable: true },
        speed: 600,
    });

    
    // ========== 用户登录状态管理 ==========
    const notLoggedInDiv = document.getElementById('notLoggedIn');
    const loggedInDiv = document.getElementById('loggedIn');
    const userNameSpan = document.getElementById('userNameDisplay');
    const dropdownUserName = document.getElementById('dropdownUserName');
    const userBtn = document.getElementById('userBtn');
    
   
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const savedUserName = localStorage.getItem('userName');
        if (isLoggedIn && savedUserName) {
			//已登录：显示用户界面，隐藏登录按钮
            notLoggedInDiv.style.display = 'none';
            loggedInDiv.style.display = 'block';
            userNameSpan.innerText = savedUserName;
            dropdownUserName.innerText = savedUserName;
        } else {
			//未登录：隐藏用户界面，显示登录按钮
            notLoggedInDiv.style.display = 'flex';
            loggedInDiv.style.display = 'none';
        }
    }
     const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();                       //阻止链接默认跳转
            localStorage.removeItem('isLoggedIn');   //清除登录状态
            localStorage.removeItem('userName');     //清除用户名
            checkLoginStatus();                      //刷新页面为未登录状态
			//关闭下拉页面
     const userDropdown = document.getElementById('userDropdown');
            if (userDropdown) userDropdown.classList.remove('show');
            toast('已安全退出登录');
        });
    }
    
    if (userBtn) {
        userBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
        document.addEventListener('click', function() {
            userDropdown.classList.remove('show');
        });
    }

    // 导航栏平滑滚动和高亮
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
                navLinks.forEach(l => l.parentElement.classList.remove('active'));
                this.parentElement.classList.add('active');
            }
        });
    });
    
    checkLoginStatus();
    window.addEventListener('pageshow', function() {
        checkLoginStatus();
    });
