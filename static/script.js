document.addEventListener('DOMContentLoaded', function () {
    addLayers().then(() => {
        console.log('Layers added successfully.');
    }).catch((error) => {
        console.error('Error adding layers:', error);
    });
});
function convert_to_array(data) {
    return data.match(/[\d.]+ [\d.]+/g).map(coord => coord.split(' ').map(parseFloat)).flat()
}
function addLayers() {
    return new Promise((resolve, reject) => {
        var dataFromHTML = JSON.parse(document.getElementById('data').textContent);
        // Initialize Cesium Viewer
        var viewer = new Cesium.Viewer('cesium-map', { // Chỉ định target là phần tử có id là 'cesium-map'
            imageryProvider: new Cesium.OpenStreetMapImageryProvider({
                url: 'https://a.tile.openstreetmap.org/'
            }),
            baseLayerPicker: false,
            geocoder: false,
            navigationHelpButton: false,
            fullscreenButton: false,
            sceneMode: Cesium.SceneMode.SCENE3D // Set scene mode to 3D
        });
        for (let i = 0; i < dataFromHTML.length; i++) {
            // Tạo một đa giác
            var coordinates = convert_to_array(dataFromHTML[i]["geometry"]);

            var entity = viewer.entities.add({
                polygon: {
                    hierarchy: Cesium.Cartesian3.fromDegreesArray(coordinates),
                    height: 0,
                    extrudedHeight: 30,
                    material: new Cesium.ColorMaterialProperty(new Cesium.Color(16/255, 0/255, 255/255, 1)) // Màu mặt bên
                }
            });
    
            // Tạo mặt trên với màu xanh
            var topEntity = viewer.entities.add({
                polygon: {
                    hierarchy: Cesium.Cartesian3.fromDegreesArray(coordinates),
                    height: 30.1,
                    material: new Cesium.ColorMaterialProperty(new Cesium.Color(0/255, 216/255, 255/255, 1)),
                    outline: false
                }
            });

            // var polygon = viewer.entities.add({
            //     polygon: {
            //         hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(
            //             convert_to_array(dataFromHTML[i]["geometry"])
            //         )),
            //         material: Cesium.Color.BLUE.withAlpha(1),
            //         height: 0,
            //         extrudedHeight: 50
            //     }
            // });
        }
        // Thiết lập tâm nhìn tại tọa độ cụ thể
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(108.2159819, 16.0600488, 1000), // Tọa độ và độ cao
            orientation: {
                heading: Cesium.Math.toRadians(0), // Góc quay
                pitch: Cesium.Math.toRadians(-90), // Góc nghiêng
                roll: Cesium.Math.toRadians(0) // Góc lăn
            }
        });

        // Resolve Promise
        resolve();
    });
}
