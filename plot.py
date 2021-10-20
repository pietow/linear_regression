import plotly.express as px
import pandas as pd
import plotly.graph_objects as go
import math
import json

with open("fit.json") as f:
    parameters = json.load(f)
print(parameters)
df = pd.read_json("data.json")
X = list(df.x)
Y = list(df.y)
errors_Y = list(df.error_y)

fig = go.Figure()
# fig.add_trace(go.Scatter(x=X, y=Y, mode="markers", name="Experiment"))
fig.add_trace(
    go.Scatter(
        x=X,
        y=Y,
        error_y=dict(type="data", array=errors_Y, visible=True),
        mode="markers",
        name="Experiment",
    )
)
df = pd.read_json("fit.json")
X = list(df.x)
Y = list(df.y)
fig.add_trace(
    go.Scatter(
        x=X,
        y=Y,
        mode="lines+markers",
        name="linear Regression line" 
            
        ,
    )
)
fig.update_layout(
    title="Regressionanalysis: r_square: " + parameters["r_sq"] + ",\n Correlation: " + parameters["correlation"],
    xaxis_title="Number of Elements used in Algorithm",
    yaxis_title="Duration in [μs]",
    font=dict(size=16, color="RebeccaPurple"),
)

# fig.update_yaxes(type="log")
# fig.update_xaxes(type="log")

fig.show()
