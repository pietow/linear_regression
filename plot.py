import plotly.express as px
import pandas as pd
import plotly.graph_objects as go

df = pd.read_json("data.json")
X = list(df.x)
Y = list(df.y)
Y2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Create traces
fig = go.Figure()
fig.add_trace(go.Scatter(x=X, y=Y, mode="lines+markers", name="lines+markers"))
fig.add_trace(
    go.Scatter(
        x=X,
        y=Y2,
        error_y=dict(type="data", array=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], visible=True),
        mode="markers",
        name="markers",
    )
)

fig.show()
