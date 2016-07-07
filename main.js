/* global echarts  */
require('./main.less');
class Chart2 {
  constructor(container, opt = []) {
    // 颜色序列
    this.colors = ['#f9814b', '#edcb26', '#67cb3c', '#1eb5eb'];
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(container);

    // 使用刚指定的配置项和数据显示图表。
    this.formatData(opt);
    const tipTemplate = (params) => {
      return `<div class='barChartMulti-tip'>` +
        `<div>` +
          `<span class="circle row-circle${params.dataIndex}"></span>` +
          `<span>` +
            `<span class="type">${params.data.name}:</span>` +
            `${params.data.value}` +
          `</span>` +
      `</div>`;
    };
    this.option = {
      tooltip: {
        trigger: 'item',
        padding: 0,
        formatter: (params/* , ticket, callback */) => {
          return tipTemplate(params);
        }
      },
      series: [
        {
          type: 'pie',
          radius: 50,
          hoverAnimation: false,
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'center',
              textStyle: {
                color: '#666',
                fontFamily: '"Helvetica Neue", Helvetica, tahoma, Arial, "Lantinghei SC", "Hiragino Sans GB", "STHeitiSC-Light", "Microsoft YaHei", "微软雅黑"',
                fontSize: 28,
                fontWeight: 100
              },
              formatter: () => {
                return this.count;
              }
            },
            emphasis: {
              show: true,
              formatter: () => {
                return this.count;
              }
            }
          }
        }
      ]
    };
    this.setData(opt);
		// myChart.setOption(option);
  }
  setData(data) {
    this.option.series[0].data = this.formatData(data);
    if (this.count === 0) {
      // 无数据或数据全部为0, 不显示tooltip
      this.option.tooltip.showContent = false;
    }
    else {
      this.option.tooltip.showContent = true;
    }
    this.myChart.setOption(this.option);
  }
  formatData(data) {
    let result = [];
		let value;
    this.count = 0;
    _.each(data, (v, k) => {
      if (v.name) {
        value = Math.max(parseInt(v.value) || 0, 0);
        this.count += value;
        result.push({
          name: v.name,
          value,
          itemStyle: {
            normal: {
              color: this.colors[k % 4]
            }
          }
        })
      }
    });
    if (result.length === 0) {
      // 数据为空
      result.push({
        name: '--',
        value: 0,
        itemStyle: {
          normal: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      });
    }
    else if (this.count === 0) {
      // 数据不为空，值全部为0
      result = [{
        name: '0',
        value: 0,
        itemStyle: {
          normal: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      }];
    }
    return result;
  }
}

export default Chart2;
