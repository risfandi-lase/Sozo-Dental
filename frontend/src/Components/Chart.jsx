import * as React from "react";
import { Browser } from "@syncfusion/ej2-base";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip,
  AccumulationAnnotation,
  AccumulationDataLabel,
} from "@syncfusion/ej2-react-charts";
import {
  loadAccumulationChartTheme,
  roundedCornnerPointRender,
} from "./theme-color";
const chartData = [
  { x: "Android", y: 45.49, text: "Android: 45.49%" },
  { x: "Windows", y: 25.35, text: "Windows: 25.35%" },
  { x: "iOS", y: 18.26, text: "iOS: 18.26%" },
  { x: "macOS", y: 5.06, text: "macOS: 5.06%" },
  { x: "Linux", y: 1.48, text: "Linux: 1.48%" },
  { x: "Others", y: 4.36, text: "Others: 4.36%" },
];
const onPointRender = (args) => {
  roundedCornnerPointRender(args);
};
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .pie-chart {
        align: center;
    }
`;
const PieCornerRadius = () => {
  const onChartLoad = () => {
    document.getElementById("pie-chart").setAttribute("title", "");
  };
  const load = (args) => {
    loadAccumulationChartTheme(args);
  };
  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section row">
        <AccumulationChartComponent
          id="pie-chart"
          title="Global Operating System Usage Share - 2024"
          subTitle="Source: wikipedia.org"
          load={load.bind(this)}
          style={{ textAlign: "center" }}
          legendSettings={{ visible: false }}
          enableAnimation={true}
          enableBorderOnMouseMove={false}
          tooltip={{
            enable: true,
            header: "",
            format:
              "<b>${point.x}</b><br>Operating System Usage: <b>${point.y}%</b>",
            enableHighlight: true,
          }}
          loaded={onChartLoad.bind(this)}
          pointRender={onPointRender.bind(this)}
        >
          <Inject
            services={[
              AccumulationLegend,
              PieSeries,
              AccumulationTooltip,
              AccumulationDataLabel,
              AccumulationAnnotation,
            ]}
          />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={chartData}
              name="Project"
              xName="x"
              yName="y"
              type="Pie"
              radius={Browser.isDevice ? "25%" : "70%"}
              explode={false}
              startAngle={120}
              innerRadius="50%"
              dataLabel={{
                visible: true,
                position: "Outside",
                name: "text",
                font: { size: "12px", fontWeight: "600" },
                connectorStyle: { length: "20px", type: "Curve" },
              }}
              borderRadius={8}
              border={{ width: 0.5, color: "white" }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    </div>
  );
};
export default PieCornerRadius;
