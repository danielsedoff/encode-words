       /* 
        Made by Daniel Sedoff in 2015.

        This script demonstrates word encoding. 
        Here word numbers are stored in Base62, 
        up to 238328. Function names: 
        e62 for encode, d62 for decode. 

        Этот скрипт демонстрирует цифровое 
        кодирование слов. Слова текста сводятся в словарь 
        и сохраняются в виде Base62, количество слов 
        ограничено 238328. Названия функций: 
        e62 - кодирование, d62 - декодирование.
        */

        alpha62 = "0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm".split('');

        function e62(inp) {
		/* Base62 encode */
            if (inp > 3843) {
                a1 = Math.floor(inp / 3844);
                x1 = inp - a1 * 3844;
                b1 = Math.floor(x1 / 62);
                c1 = x1 - b1 * 62;
                return ("" + alpha62[a1] + alpha62[b1] + alpha62[c1]);
            }
            if (inp > 61) {
                a1 = Math.floor(inp / 62);
                b1 = inp - a1 * 62;
                return ("" + alpha62[a1] + alpha62[b1]);
            }
            return (alpha62[inp]);
        }

        function d62(inp) {
			/* Base62 decode */
            ina = inp.split('');
            if (inp.length == 3) {
                x1 = alpha62.indexOf(ina[0]);
                y1 = alpha62.indexOf(ina[1]);
                z1 = alpha62.indexOf(ina[2]);
                return (x1 * 3844 + y1 * 62 + z1);
            }
            if (inp.length == 2) {
                x1 = alpha62.indexOf(ina[0]);
                y1 = alpha62.indexOf(ina[1]);
                return (x1 * 62 + y1);
            }
            return (alpha62.indexOf(ina[0]));
        }

        function gbi(x2) {
            return (document.getElementById(x2));
        }

        function encode_words() {
            maintxt = ' ' + gbi("tx1").value.replace(/([\.\,\?\!\"\'\;\:\-\n])/g, " $1 ");
            maintxt = maintxt.replace(/[ ]+/g, " ");

            /* Making a dictionary */
            arrDict = maintxt.split(" ");
            arrText = arrDict.slice();

            arrDict.sort();

            while (arrDict[0] == "") {
                arrDict.splice(0, 1);
            }
            /* remove blank lines */

            for (i = 0; i < arrDict.length - 1; i++) {
                if (arrDict[i] == arrDict[i + 1]) {
                    arrDict.splice(i, 1);
                    i--
                }
            }

            /* remove duplicate entries */

            arrDict.sort(function(a, b) {
                return a.length - b.length; /* sort by length */
            });

            for (i = 0; i < arrText.length - 1; i++) {
                arrText[i] = e62(arrDict.indexOf(arrText[i])); /* encode to base 62 */
            }

            maintxt = arrDict.join(" ");
            maintxt += "\n########\n";
            maintxt += arrText.join(" ");

            gbi("tx2").innerHTML = maintxt;

        }
