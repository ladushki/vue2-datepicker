import locale from '@/mixins/locale'
import * as moment from 'moment';
export default {
  name: 'panelQuarter',
  mixins: [locale],
  props: {
    value: null,
    calendarYear: {
      default: new Date().getFullYear()
    },
    disabledMonth: Function,
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

    let months = this.t('months')
    let qs = ['1.Q', '2.Q', '3.Q', '4.Q'];

    const currentYear = this.value && new Date(this.value).getFullYear()
    const currentQuarter = this.value && moment( new Date(this.value)).quarter()

    months = qs.map((v, i) => {
      return <span
        class={{
          'cell': true,
          'cell2': true,
          'actived': currentYear === this.calendarYear && currentQuarter === i+1,
          'disabled': this.isDisabled(i)
        }}
        onClick={this.selectQuarter.bind(this, i)}>
        {v}
      </span>
    })
    return <div class="mx-panel  mx-panel-quarter">{months}</div>
  }
}
