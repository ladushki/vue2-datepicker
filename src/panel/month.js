import locale from '@/mixins/locale'

export default {
  name: 'panelMonth',
  mixins: [locale],
  props: {
    value: null,
    startAt: null,
    endAt: null,
    calendarYear: {
      default: new Date().getFullYear()
    },
    disabledMonth: Function
  },
  methods: {
    isDisabled (month) {
      if (typeof this.disabledMonth === 'function' && this.disabledMonth(month)) {
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
    inRange (month) {
      const cellTime = this.value && new Date(this.calendarYear, month, 1).setHours(0, 0, 0, 0)
      const startTime = this.startAt && new Date(this.startAt).setHours(0, 0, 0, 0)
      const endTime = this.endAt && new Date(this.endAt).setHours(0, 0, 0, 0)
      const curTime = this.value && new Date(this.value).setHours(0, 0, 0, 0)

      if (curTime) {
        if (cellTime === curTime) {
          return false
        } else if (startTime && cellTime <= curTime) {
          return true
        } else if (endTime && cellTime >= curTime) {
          return true
        }
      }
      return false
    }
  },
  render (h) {
    let months = this.t('months')

    const currentYear = this.value && new Date(this.value).getFullYear()

    const currentMonth = this.value && new Date(this.value).getMonth()
    months = months.map((v, i) => {
      return <span
        class={{
          'cell': true,
          'actived': currentYear === this.calendarYear && currentMonth === i,
          'disabled': this.isDisabled(i),
          'inrange': this.inRange(i)
        }}
        onClick={this.selectMonth.bind(this, i)}>
        {v}
      </span>
    })
    return <div class="mx-panel mx-panel-month">{months}</div>
  }
}
