import os
import geopandas as gpd

gdf = None


def shp_to_csv(input_shp, output_csv, start_id):
    global gdf
    gdf = gpd.read_file(input_shp)
    gdf = gdf.dropna(subset=["geometry"])
    gdf["id"] = range(start_id, start_id + len(gdf))
    gdf = gdf[["id", "geometry"]]
    gdf["geometry"] = gdf["geometry"].apply(lambda x: x.wkt)
    gdf.to_csv(output_csv, mode="a", index=False, header=not os.path.exists(output_csv))


# Đường dẫn đến thư mục chứa các tệp shapefile
input_dir = "data/input/"

# Đường dẫn đến tệp CSV đầu ra
output_csv = "data/output/data.csv"

# Khởi tạo biến đếm ID
current_id = 1

# Lặp qua tất cả các tệp shapefile trong thư mục
for filename in os.listdir(input_dir):
    if filename.endswith(".shp"):
        shp_to_csv(os.path.join(input_dir, filename), output_csv, current_id)
        current_id += len(gdf)  # Tăng giá trị ID tiếp theo

print("All shapefiles have been merged into a single CSV file successfully.")
