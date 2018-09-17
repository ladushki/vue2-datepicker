export default {
  name: 'panelYear',
  props: {
    value: null,
    startAt: null,
    endAt: null,
    firstYear: Number,
    disabledYear: Function
  },
  methods: {
    isDisabled (year) {
      if (typeof this.disabledYear === 'function' && this.disabledYear(year)) {
        return true
      }
      return false
    },
    inRange (year) {
      const cellTime = this.value && new Date(year, 1, 1).setHours(0, 0, 0, 0)
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
    },
    selectYear (year) {
      if (this.isDisabled(year)) {
        return
      }
      this.$emit('select', year)
    }
  },
  render (h) {
    // 当前年代
    const firstYear = Math.floor(this.firstYear / 10) * 10
    const currentYear = this.value && new Date(this.value).getFullYear()
    const years = Array.apply(null, { length: 10 }).map((_, i) => {
      const year = firstYear + i
      return <span
        class={{
          'cell': true,
          'actived': currentYear === year,
          'disabled': this.isDisabled(year),
          'inrange': this.inRange(year)
        }}
        onClick={this.selectYear.bind(this, year)}
      >{year}</span>
    })
    return <div class="mx-panel mx-panel-year">{years}</div>
  }
}
