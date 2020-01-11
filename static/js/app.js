function buildCharts(sample) {
  d3.json("data/samples.json").then((data) => {
    console.log(data)
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var all_otu_ids=data.samples[0].otu_ids;
    console.log(all_otu_ids);
    // var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var trace1 = {
      type: "bar",
      y: yticks,
      orientation: "h" 
    };
    var barData = [trace1
      // {
      // }
    ];
    var barLayout = {
    };
    Plotly.newPlot("bar", barData, barLayout);
  });
};

function init() {
  var selector = d3.select("#selDataset");

  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    const firstSample = sampleNames[0];
    buildCharts(firstSample)
  });
};

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
};

init();