      function handleAnimations() {
            let animations = [
                ["bounce", "bounce"],
                ["flash", "flash"],
                ["pulse", "pulse"],
                ["shake", "shake"],
                ["headShake", "headShake"],
                ["swing", "swing"],
                ["tada", "tada"],
                ["wobble", "wobble"],
                ["jello", "jello"],
                ["heartBeat", "heartBeat"],
                ["bounceIn", "bounceIn"],
                ["bounceInDown", "bounceInUp"],
                ["bounceInLeft", "bounceInRight"],
                ["fadeIn", "fadeIn"],
                ["fadeInDown", "fadeInUp"],
                ["fadeInLeft", "fadeInRight"],
                ["flip", "flip"],
                ["flipInX", "flipInX"],
                ["flipInY", "flipInY"],
                ["rotateIn", "rotateIn"],
                ["rotateInDownLeft", "rotateInDownRight"],
                ["slideInDown", "slideInUp"],
                ["slideInLeft", "slideInRight"],
                ["zoomIn", "zoomIn"],
                ["zoomInDown", "zoomInUp"],
                ["zoomInLeft", "zoomInRight"],
                ["jackInTheBox", "jackInTheBox"],
            ];

            var num = getRandomInt(animations.length);

            animateCSS('[name="top"]', animations[num][0], animationOver);
            animateCSS('[name="bottom"]', animations[num][1], animationOver);
            console.log("top: " + animations[num][0]);
            console.log("bottom: " + animations[num][1]);
        }

        function addStuff() {
            at("main").innerHTML =
                `<h1 name="top"    id = "status_text" class="header animated"><a href="https://ap4sh.github.io/">Just another website</a></h1>
            <p  name="bottom" id = "text2" class="textiboi animated">Another writeup website</p>`;

            handleAnimations();
        }

        function animateCSS(element, animationName, callback) {
            const node = document.querySelector(element)
            node.classList.add('animated', animationName)
            node.classList.add('delay-2s')

            function handleAnimationEnd() {
                node.classList.remove('animated', animationName)
                node.removeEventListener('animationend', handleAnimationEnd)

                if (typeof callback === 'function') callback()
            }

            node.addEventListener('animationend', handleAnimationEnd)
        }

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        var at = document.getElementById.bind(document);
        window.addEventListener("DOMContentLoaded", () => {
            at("status_text").innerHTML = "loading";

        });

        window.addEventListener("load", () => {
            setTimeout(() => {
                if (!window.music.paused) {
                    addStuff();
                    console.log("music already started");
                    return;
                }
                at("status_text").innerHTML = "click to enter";
                at("status_text").classList.add("begin");

            }, 100);
        });

        var temp = 0

        function animationOver() {
            temp++;

            if (temp != 2)
                return;

            setTimeout(function() {
                console.log("animations over");
                var doc = document.getElementById("main");
                var inner = doc.innerHTML;
                // WOW this is aids.

                doc.innerHTML +=
                    `<div class="textiboi">
                <a id="typElement"></a></div>
                <div class="textiboi">
				<a class="textiboi animated fadeIn"  href="/blog">Home</a>
                <a class="textiboi animated fadeIn"  href="/blog/about">About</a>`;
                console.log("running typewrite");
                indefiniteWrite();

            }, 550);

        }

        function indefiniteWrite() {
            let strs = [
                "hello from Ap4sh",
                "cybersecurity enthusiast from France",
                "doing hackthebox since 2020",
                "Active especially on Hackthebox, TryHackMe and root-me",
                "Eir#1111"
            ];

            var num = getRandomInt(strs.length);

            console.log("writing " + strs[num]);

            var typElement = document.getElementById('typElement');

            var typewriter = new Typewriter(typElement, {
                loop: true
            });

            typewriter.typeString(strs[num]).pauseFor(5000).deleteAll().pauseFor(100).callFunction(() => {
                typewriter.stop();
                indefiniteWrite();
            }).start();
        }
