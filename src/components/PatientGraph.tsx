import { VFC } from "react";
import Highcharts, { SeriesOptionsType, Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface Props {
  data: SeriesOptionsType[];
  categories: string[];
  subtitleText: string;
}
export const PatientGraph: VFC<Props> = (props) => {
  const { data, categories, subtitleText } = props;

  const options: Options = {
    title: {
      text: "新型コロナウイルス感染者遷移",
    },
    subtitle: {
      text: subtitleText,
    },
    yAxis: {
      title: {
        align: "high",
        offset: 0,
        text: "感染者数",
        rotation: 0,
        y: -20,
      },
    },
    xAxis: {
      type: "datetime",
      categories,
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    series: data,
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
    lang: {
      noData: "表示するデータがありません",
    },
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
