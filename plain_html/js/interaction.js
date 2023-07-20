/* cookies */
function toastbar(message, color) {
    var el = document.createElement("div");
    el.className = "snackbar";
    var y = document.getElementById("snackbar-container");
    el.style.color = color;
    el.innerHTML = message;
    y.append(el);
    el.className = "snackbar show";
    setTimeout(function () {
        el.className = el.className.replace("snackbar show", "snackbar");
    }, 3000);
}
(function () {

    var cookieAlert = document.querySelector(".cookiealert");
    var acceptCookies = document.querySelector(".acceptcookies");

    if (!cookieAlert) {
        return;
    }

    cookieAlert.offsetHeight; // Force browser to trigger reflow (https://stackoverflow.com/a/39451131)

    // Show the alert if we cant find the "acceptCookies" cookie
    if (!getCookie("acceptCookies")) {
        cookieAlert.classList.add("show");
    }

    // When clicking on the agree button, create a 1 year
    // cookie to remember user's choice and close the banner
    acceptCookies.addEventListener("click", function () {
        setCookie("acceptCookies", true, 365);
        cookieAlert.classList.remove("show");

        // dispatch the accept event
        window.dispatchEvent(new Event("cookieAlertAccept"))
    });

    // Cookie functions from w3schools
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
})();
/* end */

/* if (location.href != 'https://rm1web.tk/asset/calendar.php' || location.href != 'https://rm1web.tk/calendar') {
    document.addEventListener('contextmenu', event => event.preventDefault());

    if (document.addEventListener) {
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        }, false);
    } else {
        document.attachEvent('oncontextmenu', function () {
            window.event.returnValue = false;
        });
    }
}
 */
document.addEventListener('contextmenu', function (e) {
    if (location.href.indexOf("calendar") <= -1 && location.href.indexOf("trip_sup") <= -1) {
        console.log('context-menu')
        e.preventDefault();
    }
});

/* document.onkeydown = function (e) {
    e = e || window.event;//Get event

    if (!e.ctrlKey) return;

    var code = e.which || e.keyCode;//Get key code

    switch (code) {
        case 83://Block Ctrl+S
        case 87://Block Ctrl+W -- Not work in Chrome and new Firefox
            e.preventDefault();
            e.stopPropagation();
            break;
    }
}; */

document.addEventListener("keyup", function (e) {//print screen disable
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 44) {
        stopPrntScr();
    }
});
function stopPrntScr() {

    var inpFld = document.createElement("input");
    inpFld.setAttribute("value", ".");
    inpFld.setAttribute("width", "0");
    inpFld.style.height = "0px";
    inpFld.style.width = "0px";
    inpFld.style.border = "0px";
    document.body.appendChild(inpFld);
    inpFld.select();
    document.execCommand("copy");
    inpFld.remove(inpFld);
}
/* function AccessClipboardData() {
    try {
        window.clipboardData.setData('text', "Access   Restricted");
    } catch (err) {
    }
}
setInterval("AccessClipboardData()", 300); */

/*function copyToClipboard() {

  var aux = document.createElement("input");
  aux.setAttribute("value", "print screen disabled!");      
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  alert("Print screen disabled!");
}
 
$(window).keyup(function(e){
  if(e.keyCode == 44){
    copyToClipboard();
  }
});*/

document.onkeydown = function (e) {
    if (e.shiftKey && e.ctrlKey && e.keyCode === 73) {//ctrl shift i
        e.preventDefault();
        return false;
    } else if (e.keyCode === 123) {//f12
        e.preventDefault();
        return false;
    } else if (e.ctrlKey && e.keyCode === 85) {//ctrl u
        e.preventDefault();
        return false;
    } else if (e.ctrlKey && e.keyCode === 83) {//ctrl s
        e.preventDefault();
        return false;
    } /* else {
        return true;
    } */
};


(function () {
    const rgx = new RegExp(/(domainName)|(:portNumUsedInLocalDev)|/g);
    const host = window.location.host;
    const isMatch = !host.match(rgx);

    function showWarning() {
        let warning = document.createElement('h1');
        warning.innerText = 'DON\'T STEAL';
        warning.style.fontSize = '5em';
        warning.style.fontWeight = 700;
        warning.style.position = 'fixed';
        warning.style.left = `${(window.innerWidth / 2)}px`;
        warning.style.top = `${window.innerHeight / 2}px`;
        warning.style.zIndex = 9999;
        document.body.appendChild(warning);
    }

    function exactRvg() {
        cornify_add();

        window.setTimeout(() => {
            exactRvg();
        }, 500);

    }
    if (isMatch) {
        showWarning();
        $.getScript('https://www.cornify.com/js/cornify.js', function () {
            exactRvg();
        });
    }

})();
function getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}


$(document).ready(function () {
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = 'img/icon/favicon-32x32.png';

    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');

    function supportsCookies() {
        try {
            // Create cookie
            document.cookie = 'cookietest=1';
            var ret = document.cookie.indexOf('cookietest=') != -1;
            // Delete cookie
            document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
            return ret;
        }
        catch (e) {
            return false;
        }
    }


})




