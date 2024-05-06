var playerArea = document.querySelector(".player-area");
    let width = window.innerWidth/70;
    var playerAreaWidth = playerArea.offsetWidth;

    $(document).ready(function() {
        new CircleType(document.getElementById('insurance'))
            .dir(-1)
            .radius((playerAreaWidth/2)-width);

        new CircleType(document.getElementById('must'))
        .dir(-1)
        .radius((playerAreaWidth/2)-(width*3.5));

        var insurance = document.getElementById('insurance')
        insurance.style.transform = 'translateY(-0.6vw)';

        var must = document.getElementById('must')
        must.style.transform = 'translateY(5vw)';

        var title = document.getElementById('title')
        title.style.transform = 'translateY(6vw)';

    });