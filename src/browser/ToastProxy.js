var Position = {
    Top: 'top',
    Center: 'center',
    Bottom: 'bottom'
};

var Duration = {
    Short: 'short', // 2000ms
    Long: 'long' // 5000ms
}

var previousToast = null;

var toast = {
    show: function (win, fail, args) {
        
        var message = args[0]['message'];
        var duration = args[0]['duration'];
        var position = args[0]['position'];

        setTimeout(function () {

            var container = document.createElement('div');

            container.style.position = 'fixed';
            container.style.textAlign = 'center';
            container.style.width = '100%';

            switch (position) {
                case Position.Top:
                    container.style.top = '30px';
                    break;
                case Position.Center:
                    //container.style.bottom = '50px';
                    break;
                case Position.Bottom:
                default:
                    container.style.bottom = '30px';
                    break;
            }

            var text = document.createElement('span');
            var style = text.style;

            style.display = 'inline-block';

            style.maxWidth = '90%';
            style.padding = '10px 20px';
            style.zIndex = '5000';
            style.color = 'white';
            style.backgroundColor = '#707070';

            ['webkitBorderRadius', 'mozBorderRadius', 'borderRadius'].forEach(function (property) {
                if (property in style) {
                    style[property] = '20px';
                }
            });

            style.textShadow = '0 0 2px #000';
            style.fontSize = '14px';

            style.opacity = 0;
            style.transition = 'opacity 0.3s linear';
            style.transform = 'translateZ(0)';//activation hardware acceleration

            text.innerText = message;

            container.appendChild(text);

            document.body.appendChild(container);

            setTimeout(function () {

                style.opacity = 9;

                var delay;
                switch (duration) {
                    case Duration.Long:
                        delay = 5000;
                        break;
                    case Duration.Short:
                    default:
                        delay = 2000;
                        break;
                }

                setTimeout(function () {
                    style.opacity = 0;
                    
                    setTimeout(function () {
                        document.body.removeChild(container);

                        if (previousToast === text) {
                            previousToast = null;
                        }

                    }, 1000);

                }, delay)

            });

            if (!!previousToast) {

                previousToast.style.opacity = 0;

            }

            previousToast = text;

            if (win) {
                win();
            }

        }, 0);

    },
};

module.exports = toast;

require('cordova/exec/proxy').add('Toast', module.exports);
