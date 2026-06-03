(function($) {
    $.addEventListener("scroll",()=>{
        document.querySelector(".navbar").classList.toggle("scrolled", $.scrollY > 50);
    });
    
    // --- Hero slider ---
    const hero = document.querySelector('.hero');
    const titleEl = document.querySelector('.hero-title');
    const subEl = document.querySelector('.hero-sub');

    if (hero && titleEl && subEl) {
        const heroBgs = document.querySelectorAll('.hero-bg');

        const slides = [
            
            {
                title: 'No More Scam.<br>No More Victims.',
                sub: '대한민국을 대상으로 하는 온라인 피싱, 투자사기, 가짜 쇼핑몰 등<br> 악성 인프라를 추적·분석하고 대응 활동을 수행합니다.'
            },
            {
                title: '한국인을 노리는 사기,<br>우리가 끝까지 추적합니다.',
                sub: '악성 인프라 및 도메인 분석을 통해 사기성 사이트를 식별하고<br> 관련 기관 및 서비스 제공자와의 협력을 통해 신속하게 대응합니다.'
            },
            {
                title: '위협 인텔리전스 네트워크<br>신속하고 광범위한 피해 완화',
                sub: 'NMS-K는 사기성 사이트를 추적하고 공유하고 차단하여<br>더 이상 피해자가 생기지 않도록 노력하고 있습니다.'
            }
        ];

        let idx = 0;

        const showSlide = (i) => {
            // fade out
            titleEl.classList.add('fade-out');
            subEl.classList.add('fade-out');

            setTimeout(()=>{
                titleEl.innerHTML = slides[i].title;
                subEl.innerHTML = slides[i].sub;
                // fade in
                titleEl.classList.remove('fade-out');
                subEl.classList.remove('fade-out');
            }, 420);
        };

        // start with first slide (ensure content matches)
        titleEl.innerHTML = slides[0].title;
        subEl.innerHTML = slides[0].sub;
        // ensure first bg is active
        if (heroBgs && heroBgs.length) {
            heroBgs.forEach((b, i) => b.classList.toggle('active', i === 0));
        }

        setInterval(()=>{
            idx = (idx + 1) % slides.length;
            showSlide(idx);
            // toggle hero backgrounds: bg 0 -> 1 -> 0
            if (heroBgs && heroBgs.length) {
                heroBgs.forEach((b, i) => b.classList.toggle('active', i === idx ? true : false));
            }
        }, 6000);
    }

    // --- Mission image switcher ---
    const missionPoints = document.querySelectorAll('.mission-point');
    const missionImageCard = document.querySelector('.mission-image-card');
    const missionImage = missionImageCard ? missionImageCard.querySelector('img') : null;
    const missionCaption = document.querySelector('.mission-image-badge');

    const activateMissionPoint = (point) => {
        if (!point || !missionImage || !missionImageCard) return;

        const imagePath = point.dataset.missionImage;
        const label = point.dataset.missionLabel || point.querySelector('h3')?.textContent || '';

        missionPoints.forEach((item) => item.classList.toggle('active', item === point));

        if (imagePath && missionImage.getAttribute('src') !== imagePath) {
            missionImageCard.classList.add('is-updating');
            window.setTimeout(() => {
                missionImage.setAttribute('src', imagePath);
                if (missionCaption) missionCaption.textContent = label;
            }, 120);

            window.setTimeout(() => {
                missionImageCard.classList.remove('is-updating');
            }, 260);
        } else if (missionCaption) {
            missionCaption.textContent = label;
        }
    };

    if (missionPoints.length && missionImage && missionImageCard) {
        missionPoints.forEach((point) => {
            point.setAttribute('role', 'button');
            point.setAttribute('tabindex', '0');
            point.addEventListener('click', () => activateMissionPoint(point));
            point.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    activateMissionPoint(point);
                }
            });
        });

        activateMissionPoint(document.querySelector('.mission-point.active') || missionPoints[0]);
    }

})(window)