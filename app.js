new Vue({
    el: '#app',
    data: {
        calc: '0',
        clearnext: false,
        clearpreview: false,
        preview: '',
        operator: '',
        preoperation: '',
        fixed: null
    },
    methods: {
        updateCalc(val) {
            this.calc = val
            this.$nextTick(() => {
                let fontSize = 50
                if (this.calc.length < 10) {
                    this.$refs.displayText.setAttribute('style', 'font-size:' + fontSize + 'px')
                }
                while (this.$refs.displayText.offsetWidth + 35 > this.$refs.display.offsetWidth) {
                    fontSize--
                    this.$refs.displayText.setAttribute('style', 'font-size:' + fontSize + 'px')
                }
                
            })
        },
        updatePreview(val) {
            this.preview = val
            this.$nextTick(() => {
                let fontSize = 20
                if (this.preview.length < 10) {
                    this.$refs.displayPreview.setAttribute('style', 'font-size:' + fontSize + 'px')
                }
                while (this.$refs.displayPreview.offsetWidth + 40 > this.$refs.display.offsetWidth) {
                    fontSize--
                    this.$refs.displayPreview.setAttribute('style', 'font-size:' + fontSize + 'px')
                }
                
            })
        },
        addnumber(num) {

            if (num == '.' && this.calc.includes('.')) return
            if (num  == '(' && this.calc.includes('(')) return
            if (num == ')' && this.calc.includes(')')) return
            
            if (this.clearpreview == true) {
                this.updatePreview('')
                this.clearpreview = false
            }

            if ((this.calc == '0' || this.clearnext == true) && num != '.') {

                this.updateCalc(num)   

                this.clearnext = false

                this.operator = null
            } else {

                if (num == '(') {
                    this.updateCalc(num + this.calc)
                } else {
                    this.updateCalc(this.calc + num)  
                }                
                this.operator = null
            }

        },
        clear() {

            if (this.calc == '0') {
                this.updatePreview('')
            }
            this.updateCalc('0')

        },
        invert() {

            this.updateCalc(this.calc * -1)

        },
        operate(actualoperator) {

            if (this.calc.charAt(this.calc.length - 1) == '(') return

            this.clearpreview = false

            if (this.preview != '' && this.clearnext == false) {
                this.preoperation = this.preview
                this.updatePreview(this.preoperation + ' ' + this.calc + ' ' + actualoperator)
                this.clearnext = true
            } else if (isNaN(+this.preview.charAt(this.preview.length - 1))) {
                this.preview = this.preview.slice(0, -1)
                this.preview += actualoperator
            } else {
                this.updatePreview(this.calc + ' ' + actualoperator)
                this.clearnext = true
            }

        },
        equals() {

            if (this.preview != '' && isNaN(this.preview.charAt(this.preview.length - 1))) {
                this.updatePreview(this.preview + ' ' +this.calc)
                this.updateCalc(eval(this.preview).toString())
                this.operator = null
                this.clearnext = true
                this.clearpreview = true
            }

        }

    }
})