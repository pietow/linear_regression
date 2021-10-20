import plotly.express as px
import pandas as pd
import plotly.graph_objects as go
import numpy as np
import math

# X = [x for x in range(1, 10)]
# Y = [20 * math.log2(y) for y in range(1, 10)]
X = np.linspace(2, 8, 7)
X = ([np.power(2, x) for x in X])
Y = (2 * np.log2(X))
# Y = [math.exp(y) for y in range(1, 10)]

fig = go.Figure()
fig.add_trace(go.Scatter(x=X, y=Y, mode="markers", name="Experiment"))
df = pd.read_json("fit.json")
# X = list(map(lambda x: math.log2(x), X))
Y = np.sqrt(np.power(2, Y))
Y = (np.power(2, Y))
fig.add_trace(
    go.Scatter(
        x=X,
        y=Y,
        mode="lines+markers",
        name="linear Regression",
    )
)
fig.update_layout(
    title="Regressionanalysis",
    xaxis_title="Number of Elements used in Algorithm",
    yaxis_title="Duration in [ms/1000]",
    font=dict(
        size=16,
        color="RebeccaPurple"
    )
)

# fig.update_yaxes(type="log")
# fig.update_xaxes(type="log")

fig.show()
