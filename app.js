new Vue({
    el: '#app',
    data: {
        calc: '0',
        preview: '',
        operation: '',
        preoperation: '',
        operations: {
            '/': (a, b) => a / b,
            '*' : (a , b) => a * b,
            '-' : (a , b) => a - b,
            '+': (a, b) => a + b,
            '%' : (a) => a / 100
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
                this.preview = Number(this.calc);
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
            }
            this.updateCalc('0');
            this.operation = '';
        },
        invert() {
            this.updateCalc(this.calc * -1);
        },
        operate(operator) {

            if (operator == '%') {
                const value = this.operations[operator](+this.calc);;
                this.updateCalc(value);
                operator = '';
            }else if (this.operation != '' && this.preview != '' && this.preview != null) {
                this.equals();
            }
            
            this.preview = null; 
            this.operation = operator; 

        },
        equals() {
            
            this.preoperation = this.preview + ' ' + this.operation + ' ' + this.calc;

            const value = this.operations[this.operation](+this.preview, +this.calc);

            this.updateCalc(value);

            this.operation = '';

            this.preview = this.preoperation;
        }

    }
})