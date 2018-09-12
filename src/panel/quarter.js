import locale from '@/mixins/locale'
import moment from 'moment'
export default {
  name: 'panelQuarter',
  mixins: [locale],
  props: {
    value: null,
    calendarYear: {
      default: new Date().getFullYear()
    },
    disabledQuarter: Function
  },
  methods: {
    isDisabled (q) {
      if (typeof this.disabledQuarter === 'function' && this.disabledQuarter(q)) {
        return true
      }
      return false
    },
    selectMonth (month) {
      if (this.isDisabled(month)) {
        return
      }
      this.$emit('select', month)
    },
    selectQuarter (q) {
      if (this.isDisabled(q)) {
        return
      }
      this.$emit('select', q)
    }
  },
  render (h) {
    let qs = ['Q1', 'Q2', 'Q3', 'Q4']

    const currentYear = this.value && new Date(this.value).getFullYear()
    const currentQuarter = this.value && moment(new Date(this.value)).quarter()

    let quarters = qs.map((v, i) => {
      return <span
        class={{
          'cell': true,
          'actived': currentYear === this.calendarYear && currentQuarter === i + 1,
          'disabled': this.isDisabled(i)
        }}
        onClick={this.selectQuarter.bind(this, i)}>
        {v}
      </span>
    })
    return <div class="mx-panel  mx-panel-quarter">{quarters}</div>
  }
}
