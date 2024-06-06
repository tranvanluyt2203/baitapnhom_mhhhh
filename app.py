from flask import Flask, render_template
import csv
import json

app = Flask(__name__)


@app.route("/")
def index():
    # Đọc dữ liệu từ tệp CSV và chuyển đổi thành danh sách dictionaries
    data_ = []
    with open("./data/output/data.csv", newline="") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data_.append(
                {
                    "id": row["id"],
                    "geometry": row["geometry"],
                }
            )
    return render_template("index.html", data=data_)
@app.route("/test")
def test():
    return render_template("test.html")



if __name__ == "__main__":
    app.run(debug=True)
