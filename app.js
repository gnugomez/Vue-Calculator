new Vue({
    el: '#app',
    data: {
        calc: '0',
        previousnum: null,
        preview: '',
        operator: '',
        preoperation: '',
        fixed: null,
        operations: {
            '/': (a, b) => a / b,
            '*': (a , b) => a * b,
            '-': (a , b) => a - b,
            '+': (a, b) => a + b,
            '%': (a) => a / 100,
            '^2': (a) => a * a,
            '^3': (a) => a * a * a,
            'r2': (a) => Math.sqrt(a)
        }
    },
    methods: {
        updateCalc(val) {
            this.calc = val;
            this.$nextTick(() => {
                let fontSize = 50;
                if (this.calc.length < 10) {
                    this.$refs.displayText.setAttribute('style', 'font-size:' + "50" + 'px')
                }
                while (this.$refs.displayText.offsetWidth + 35 > this.$refs.display.offsetWidth) {
                    fontSize--;
                    this.$refs.displayText.setAttribute('style', 'font-size:' + fontSize + 'px')
                }
                
            })
        },
        addnumber(num) {
            if(num == '.' && this.calc.includes('.')) return;

            if (this.preview === null) {
                this.previousnum = +this.calc;
                this.preview = this.calc + " " +this.operator;
                this.updateCalc('0');
            }

            if (this.calc == '0' && num != '.') {
                this.updateCalc('');
                this.updateCalc(this.calc + num);
            } else {
                this.updateCalc(this.calc + num);
            }
        },
        clear() {
            if (this.calc === '0') {
                this.preview = '';
                this.previousnum = null;
            }
            this.updateCalc('0');
            this.fixed = null;
            this.operator = '';
        },
        invert() {
            this.updateCalc(this.calc * -1);
        },
        operate(actualoperator) {

            if (actualoperator == '%' || actualoperator == '^2' || actualoperator == '^3' || actualoperator== 'r2') {
                const value = this.operations[actualoperator](+this.calc);
                this.updateCalc(value);
                return
            } else if (this.operator != '' && this.previousnum != null && this.preview != null) {
                this.equals();
                
            }
            
            this.fixed = null;
            this.previousnum = null;
            this.preview = null; 
            this.operator = actualoperator; 

        },
        equals() {
            if (this.operator != '') {
                if (this.fixed == null) {
                    this.preoperation = this.previousnum + ' ' + this.operator + ' ' + this.calc;
                    const value = this.operations[this.operator](+this.previousnum, +this.calc);   
                    this.fixed = this.calc;

                    this.previousnum = null;

                    this.updateCalc(value);
                } else {
                    this.preoperation = this.calc + ' ' + this.operator + ' ' + this.fixed;
                    const value = this.operations[this.operator](+this.calc, +this.fixed);   

                    this.updateCalc(value);
                }
            }            

            this.preview = this.preoperation;
        }

    }
})