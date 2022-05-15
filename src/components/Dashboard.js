import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../css/Dashboard.scss";
import * as d3 from "d3";
import { generateData } from "../utils/utils";
function Dashboard() {
  const generateChart = (dat) => {
    const data = dat;
    const svg = d3.select(divRef.current);
    const padding = { top: 20, right: 30, bottom: 30, left: 50 };
    const colors = d3.schemeCategory10;
    const chartArea = {
      width: parseInt(svg.style("width")) - padding.left - padding.right,
      height: parseInt(svg.style("height")) - padding.top - padding.bottom,
    };

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d, i) => {
          return d.score;
        }),
      ])
      .range([chartArea.height, 0]);

    const xScale = d3
      .scaleBand()
      .domain(
        data.map((d) => {
          return d.name;
        })
      )
      .range([0, chartArea.width])
      .padding(0.2);

    const xAxis = svg
      .append("g")
      .classed("xAxis", true)
      .attr(
        "transform",
        `translate(${padding.left},${chartArea.height + padding.top})`
      )
      .call(d3.axisBottom(xScale));

    const yAxis = svg
      .append("g")
      .classed("yAxis", true)
      .attr("transform", `translate(${padding.left},${padding.top})`)
      .call(d3.axisLeft(yScale));
    const rectGroup = svg
      .append("g")
      .attr("transform", `translate(${padding.left},${padding.top})`);

    rectGroup
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("width", xScale.bandwidth())
      .attr("height", (d, i) => {
        return chartArea.height - yScale(d.score);
      })
      .attr("x", (d, i) => {
        return xScale(d.name);
      })
      .attr("y", (d, i) => {
        return yScale(d.score);
      })
      // .attr("fill", (d, i) => {
      //   return colors[i];
      // });
      .attr("fill", "#33adff");
  };
  const [newData, setNewData] = useState([]);
  const divRef = useRef();
  const handleChange = () => {
    setNewData(getFilteredData());
  };
  const getFilteredData = () => {
    const map = {};
    const newArray = [];
    generateData(5, 5).forEach((el) => {
      if (!map[JSON.stringify(el.name)]) {
        map[JSON.stringify(el.name)] = true;
        newArray.push(el);
      } else {
        el.name = "@" + el.name;
        newArray.push(el);
      }
    });
    return newArray;
  };

  const isMounted = useRef();

  useEffect(() => {
    if (isMounted.current) return;
    setTimeout(() => {
      generateChart(getFilteredData());
    }, 500);
    isMounted.current = true;
  }, []);

  useLayoutEffect(() => {
    d3.selectAll(".tick").remove().exit();
    d3.selectAll("rect").remove().exit();
    generateChart(newData);
  }, [newData]);

  return (
    <div className="main_div">
      <div className="chart_div">
        <svg ref={divRef} width="700" height="400"></svg>
      </div>
      <div className="button_div">
        <button
          onClick={() => {
            handleChange();
          }}
        >
          changedata
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
