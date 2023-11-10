(function(oe, te) {
    typeof exports == "object" && typeof module < "u" ? te(exports) : typeof define == "function" && define.amd ? define(["exports"], te) : (oe = typeof globalThis < "u" ? globalThis : oe || self, te(oe.MaplibreLegendControl = {}))
})(this, function(oe) {
    "use strict";
    var wl = Object.defineProperty;
    var xl = (oe, te, Te) => te in oe ? wl(oe, te, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Te
    }) : oe[te] = Te;
    var ue = (oe, te, Te) => (xl(oe, typeof te != "symbol" ? te + "" : te, Te), Te);
    var te = 8,
        Te = {
            version: {
                required: !0,
                type: "enum",
                values: [8],
                doc: "Style specification version number. Must be 8.",
                example: 8
            },
            name: {
                type: "string",
                doc: "A human-readable name for the style.",
                example: "Bright"
            },
            metadata: {
                type: "*",
                doc: "Arbitrary properties useful to track with the stylesheet, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'."
            },
            center: {
                type: "array",
                value: "number",
                doc: "Default map center in longitude and latitude.  The style center will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
                example: [-73.9749, 40.7736]
            },
            zoom: {
                type: "number",
                doc: "Default zoom level.  The style zoom will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
                example: 12.5
            },
            bearing: {
                type: "number",
                default: 0,
                period: 360,
                units: "degrees",
                doc: 'Default bearing, in degrees. The bearing is the compass direction that is "up"; for example, a bearing of 90° orients the map so that east is up. This value will be used only if the map has not been positioned by other means (e.g. map options or user interaction).',
                example: 29
            },
            pitch: {
                type: "number",
                default: 0,
                units: "degrees",
                doc: "Default pitch, in degrees. Zero is perpendicular to the surface, for a look straight down at the map, while a greater value like 60 looks ahead towards the horizon. The style pitch will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
                example: 50
            },
            light: {
                type: "light",
                doc: "The global light source.",
                example: {
                    anchor: "viewport",
                    color: "white",
                    intensity: .4
                }
            },
            terrain: {
                type: "terrain",
                doc: "A global modifier that elevates layers and markers based on a DEM data source."
            },
            fog: {
                type: "fog",
                doc: "A global effect that fades layers and markers based on their distance to the camera. The fog can be used to approximate the effect of atmosphere on distant objects and enhance the depth perception of the map when used with terrain or 3D features. Note: fog is renamed to atmosphere in the Android and iOS SDKs and planned to be changed in GL-JS v.3.0.0."
            },
            sources: {
                required: !0,
                type: "sources",
                doc: "Data source specifications.",
                example: {
                    "mapbox-streets": {
                        type: "vector",
                        url: "mapbox://mapbox.mapbox-streets-v6"
                    }
                }
            },
            sprite: {
                type: "string",
                doc: "A base URL for retrieving the sprite image and metadata. The extensions `.png`, `.json` and scale factor `@2x.png` will be automatically appended. This property is required if any layer uses the `background-pattern`, `fill-pattern`, `line-pattern`, `fill-extrusion-pattern`, or `icon-image` properties. The URL must be absolute, containing the [scheme, authority and path components](https://en.wikipedia.org/wiki/URL#Syntax).",
                example: "mapbox://sprites/mapbox/bright-v8"
            },
            glyphs: {
                type: "string",
                doc: "A URL template for loading signed-distance-field glyph sets in PBF format. The URL must include `{fontstack}` and `{range}` tokens. This property is required if any layer uses the `text-field` layout property. The URL must be absolute, containing the [scheme, authority and path components](https://en.wikipedia.org/wiki/URL#Syntax).",
                example: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf"
            },
            transition: {
                type: "transition",
                doc: "A global transition definition to use as a default across properties, to be used for timing transitions between one value and the next when no property-specific transition is set. Collision-based symbol fading is controlled independently of the style's `transition` property.",
                example: {
                    duration: 300,
                    delay: 0
                }
            },
            projection: {
                type: "projection",
                doc: "The projection the map should be rendered in. Supported projections are Mercator, Globe, Albers, Equal Earth, Equirectangular (WGS84), Lambert conformal conic, Natural Earth, and Winkel Tripel. Terrain, sky and fog are supported by only Mercator and globe. CustomLayerInterface is not supported outside of Mercator.",
                example: {
                    name: "albers",
                    center: [-154, 50],
                    parallels: [55, 65]
                }
            },
            layers: {
                required: !0,
                type: "array",
                value: "layer",
                doc: "Layers will be drawn in the order of this array.",
                example: [{
                    id: "water",
                    source: "mapbox-streets",
                    "source-layer": "water",
                    type: "fill",
                    paint: {
                        "fill-color": "#00ffff"
                    }
                }]
            }
        },
        ji = {
            "*": {
                type: "source",
                doc: "Specification of a data source. For vector and raster sources, either TileJSON or a URL to a TileJSON must be provided. For image and video sources, a URL must be provided. For GeoJSON sources, a URL or inline GeoJSON must be provided."
            }
        },
        Ti = ["source_vector", "source_raster", "source_raster_dem", "source_geojson", "source_video", "source_image"],
        zi = {
            type: {
                required: !0,
                type: "enum",
                values: {
                    vector: {
                        doc: "A vector tile source."
                    }
                },
                doc: "The type of the source."
            },
            url: {
                type: "string",
                doc: "A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<Tileset ID>`."
            },
            tiles: {
                type: "array",
                value: "string",
                doc: "An array of one or more tile source URLs, as in the TileJSON spec."
            },
            bounds: {
                type: "array",
                value: "number",
                length: 4,
                default: [-180, -85.051129, 180, 85.051129],
                doc: "An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."
            },
            scheme: {
                type: "enum",
                values: {
                    xyz: {
                        doc: "Slippy map tilenames scheme."
                    },
                    tms: {
                        doc: "OSGeo spec scheme."
                    }
                },
                default: "xyz",
                doc: "Influences the y direction of the tile coordinates. The global-mercator (aka Spherical Mercator) profile is assumed."
            },
            minzoom: {
                type: "number",
                default: 0,
                doc: "Minimum zoom level for which tiles are available, as in the TileJSON spec."
            },
            maxzoom: {
                type: "number",
                default: 22,
                doc: "Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
            },
            attribution: {
                type: "string",
                doc: "Contains an attribution to be displayed when the map is shown to a user."
            },
            promoteId: {
                type: "promoteId",
                doc: "A property to use as a feature id (for feature state). Either a property name, or an object of the form `{<sourceLayer>: <propertyName>}`. If specified as a string for a vector tile source, the same property is used across all its source layers. If specified as an object only specified source layers will have id overriden, others will fallback to original feature id"
            },
            volatile: {
                type: "boolean",
                default: !1,
                doc: "A setting to determine whether a source's tiles are cached locally.",
                "sdk-support": {
                    "basic functionality": {
                        android: "9.3.0",
                        ios: "5.10.0"
                    }
                }
            },
            "*": {
                type: "*",
                doc: "Other keys to configure the data source."
            }
        },
        Ci = {
            type: {
                required: !0,
                type: "enum",
                values: {
                    raster: {
                        doc: "A raster tile source."
                    }
                },
                doc: "The type of the source."
            },
            url: {
                type: "string",
                doc: "A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<Tileset ID>`."
            },
            tiles: {
                type: "array",
                value: "string",
                doc: "An array of one or more tile source URLs, as in the TileJSON spec."
            },
            bounds: {
                type: "array",
                value: "number",
                length: 4,
                default: [-180, -85.051129, 180, 85.051129],
                doc: "An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."
            },
            minzoom: {
                type: "number",
                default: 0,
                doc: "Minimum zoom level for which tiles are available, as in the TileJSON spec."
            },
            maxzoom: {
                type: "number",
                default: 22,
                doc: "Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
            },
            tileSize: {
                type: "number",
                default: 512,
                units: "pixels",
                doc: "The minimum visual size to display tiles for this layer. Only configurable for raster layers."
            },
            scheme: {
                type: "enum",
                values: {
                    xyz: {
                        doc: "Slippy map tilenames scheme."
                    },
                    tms: {
                        doc: "OSGeo spec scheme."
                    }
                },
                default: "xyz",
                doc: "Influences the y direction of the tile coordinates. The global-mercator (aka Spherical Mercator) profile is assumed."
            },
            attribution: {
                type: "string",
                doc: "Contains an attribution to be displayed when the map is shown to a user."
            },
            volatile: {
                type: "boolean",
                default: !1,
                doc: "A setting to determine whether a source's tiles are cached locally.",
                "sdk-support": {
                    "basic functionality": {
                        android: "9.3.0",
                        ios: "5.10.0"
                    }
                }
            },
            "*": {
                type: "*",
                doc: "Other keys to configure the data source."
            }
        },
        Ei = {
            type: {
                required: !0,
                type: "enum",
                values: {
                    "raster-dem": {
                        doc: "A RGB-encoded raster DEM source"
                    }
                },
                doc: "The type of the source."
            },
            url: {
                type: "string",
                doc: "A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<Tileset ID>`."
            },
            tiles: {
                type: "array",
                value: "string",
                doc: "An array of one or more tile source URLs, as in the TileJSON spec."
            },
            bounds: {
                type: "array",
                value: "number",
                length: 4,
                default: [-180, -85.051129, 180, 85.051129],
                doc: "An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."
            },
            minzoom: {
                type: "number",
                default: 0,
                doc: "Minimum zoom level for which tiles are available, as in the TileJSON spec."
            },
            maxzoom: {
                type: "number",
                default: 22,
                doc: "Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
            },
            tileSize: {
                type: "number",
                default: 512,
                units: "pixels",
                doc: "The minimum visual size to display tiles for this layer. Only configurable for raster layers."
            },
            attribution: {
                type: "string",
                doc: "Contains an attribution to be displayed when the map is shown to a user."
            },
            encoding: {
                type: "enum",
                values: {
                    terrarium: {
                        doc: "Terrarium format PNG tiles. See https://aws.amazon.com/es/public-datasets/terrain/ for more info."
                    },
                    mapbox: {
                        doc: "Mapbox Terrain RGB tiles. See https://www.mapbox.com/help/access-elevation-data/#mapbox-terrain-rgb for more info."
                    }
                },
                default: "mapbox",
                doc: "The encoding used by this source. Mapbox Terrain RGB is used by default"
            },
            volatile: {
                type: "boolean",
                default: !1,
                doc: "A setting to determine whether a source's tiles are cached locally.",
                "sdk-support": {
                    "basic functionality": {
                        android: "9.3.0",
                        ios: "5.10.0"
                    }
                }
            },
            "*": {
                type: "*",
                doc: "Other keys to configure the data source."
            }
        },
        Ai = {
            type: {
                required: !0,
                type: "enum",
                values: {
                    geojson: {
                        doc: "A GeoJSON data source."
                    }
                },
                doc: "The data type of the GeoJSON source."
            },
            data: {
                type: "*",
                doc: "A URL to a GeoJSON file, or inline GeoJSON."
            },
            maxzoom: {
                type: "number",
                default: 18,
                doc: "Maximum zoom level at which to create vector tiles (higher means greater detail at high zoom levels)."
            },
            attribution: {
                type: "string",
                doc: "Contains an attribution to be displayed when the map is shown to a user."
            },
            buffer: {
                type: "number",
                default: 128,
                maximum: 512,
                minimum: 0,
                doc: "Size of the tile buffer on each side. A value of 0 produces no buffer. A value of 512 produces a buffer as wide as the tile itself. Larger values produce fewer rendering artifacts near tile edges and slower performance."
            },
            filter: {
                type: "*",
                doc: "An expression for filtering features prior to processing them for rendering."
            },
            tolerance: {
                type: "number",
                default: .375,
                doc: "Douglas-Peucker simplification tolerance (higher means simpler geometries and faster performance)."
            },
            cluster: {
                type: "boolean",
                default: !1,
                doc: "If the data is a collection of point features, setting this to true clusters the points by radius into groups. Cluster groups become new `Point` features in the source with additional properties:\n * `cluster` Is `true` if the point is a cluster \n * `cluster_id` A unqiue id for the cluster to be used in conjunction with the [cluster inspection methods](https://www.mapbox.com/mapbox-gl-js/api/#geojsonsource#getclusterexpansionzoom)\n * `point_count` Number of original points grouped into this cluster\n * `point_count_abbreviated` An abbreviated point count"
            },
            clusterRadius: {
                type: "number",
                default: 50,
                minimum: 0,
                doc: "Radius of each cluster if clustering is enabled. A value of 512 indicates a radius equal to the width of a tile."
            },
            clusterMaxZoom: {
                type: "number",
                doc: "Max zoom on which to cluster points if clustering is enabled. Defaults to one zoom less than maxzoom (so that last zoom features are not clustered). Clusters are re-evaluated at integer zoom levels so setting clusterMaxZoom to 14 means the clusters will be displayed until z15."
            },
            clusterMinPoints: {
                type: "number",
                doc: "Minimum number of points necessary to form a cluster if clustering is enabled. Defaults to `2`."
            },
            clusterProperties: {
                type: "*",
                doc: 'An object defining custom properties on the generated clusters if clustering is enabled, aggregating values from clustered points. Has the form `{"property_name": [operator, map_expression]}`. `operator` is any expression function that accepts at least 2 operands (e.g. `"+"` or `"max"`) — it accumulates the property value from clusters/points the cluster contains; `map_expression` produces the value of a single point.\n\nExample: `{"sum": ["+", ["get", "scalerank"]]}`.\n\nFor more advanced use cases, in place of `operator`, you can use a custom reduce expression that references a special `["accumulated"]` value, e.g.:\n`{"sum": [["+", ["accumulated"], ["get", "sum"]], ["get", "scalerank"]]}`'
            },
            lineMetrics: {
                type: "boolean",
                default: !1,
                doc: "Whether to calculate line distance metrics. This is required for line layers that specify `line-gradient` values."
            },
            generateId: {
                type: "boolean",
                default: !1,
                doc: "Whether to generate ids for the geojson features. When enabled, the `feature.id` property will be auto assigned based on its index in the `features` array, over-writing any previous values."
            },
            promoteId: {
                type: "promoteId",
                doc: "A property to use as a feature id (for feature state). Either a property name, or an object of the form `{<sourceLayer>: <propertyName>}`."
            }
        },
        _i = {
            type: {
                required: !0,
                type: "enum",
                values: {
                    video: {
                        doc: "A video data source."
                    }
                },
                doc: "The data type of the video source."
            },
            urls: {
                required: !0,
                type: "array",
                value: "string",
                doc: "URLs to video content in order of preferred format."
            },
            coordinates: {
                required: !0,
                doc: "Corners of video specified in longitude, latitude pairs.",
                type: "array",
                length: 4,
                value: {
                    type: "array",
                    length: 2,
                    value: "number",
                    doc: "A single longitude, latitude pair."
                }
            }
        },
        Si = {
            type: {
                required: !0,
                type: "enum",
                values: {
                    image: {
                        doc: "An image data source."
                    }
                },
                doc: "The data type of the image source."
            },
            url: {
                required: !0,
                type: "string",
                doc: "URL that points to an image."
            },
            coordinates: {
                required: !0,
                doc: "Corners of image specified in longitude, latitude pairs.",
                type: "array",
                length: 4,
                value: {
                    type: "array",
                    length: 2,
                    value: "number",
                    doc: "A single longitude, latitude pair."
                }
            }
        },
        Ii = {
            id: {
                type: "string",
                doc: "Unique layer name.",
                required: !0
            },
            type: {
                type: "enum",
                values: {
                    fill: {
                        doc: "A filled polygon with an optional stroked border.",
                        "sdk-support": {
                            "basic functionality": {
                                js: "0.10.0",
                                android: "2.0.1",
                                ios: "2.0.0",
                                macos: "0.1.0"
                            }
                        }
                    },
                    line: {
                        doc: "A stroked line.",
                        "sdk-support": {
                            "basic functionality": {
                                js: "0.10.0",
                                android: "2.0.1",
                                ios: "2.0.0",
                                macos: "0.1.0"
                            }
                        }
                    },
                    symbol: {
                        doc: "An icon or a text label.",
                        "sdk-support": {
                            "basic functionality": {
                                js: "0.10.0",
                                android: "2.0.1",
                                ios: "2.0.0",
                                macos: "0.1.0"
                            }
                        }
                    },
                    circle: {
                        doc: "A filled circle.",
                        "sdk-support": {
                            "basic functionality": {
                                js: "0.10.0",
                                android: "2.0.1",
                                ios: "2.0.0",
                                macos: "0.1.0"
                            }
                        }
                    },
                    heatmap: {
                        doc: "A heatmap.",
                        "sdk-support": {
                            "basic functionality": {
                                js: "0.41.0",
                                android: "6.0.0",
                                ios: "4.0.0",
                                macos: "0.7.0"
                            }
                        }
                    },
                    "fill-extrusion": {
                        doc: "An extruded (3D) polygon.",
                        "sdk-support": {
                            "basic functionality": {
                                js: "0.27.0",
                                android: "5.1.0",
                                ios: "3.6.0",
                                macos: "0.5.0"
                            }
                        }
                    },
                    raster: {
                        doc: "Raster map textures such as satellite imagery.",
                        "sdk-support": {
                            "basic functionality": {
                                js: "0.10.0",
                                android: "2.0.1",
                                ios: "2.0.0",
                                macos: "0.1.0"
                            }
                        }
                    },
                    hillshade: {
                        doc: "Client-side hillshading visualization based on DEM data. Currently, the implementation only supports Mapbox Terrain RGB and Mapzen Terrarium tiles.",
                        "sdk-support": {
                            "basic functionality": {
                                js: "0.43.0",
                                android: "6.0.0",
                                ios: "4.0.0",
                                macos: "0.7.0"
                            }
                        }
                    },
                    background: {
                        doc: "The background color or pattern of the map.",
                        "sdk-support": {
                            "basic functionality": {
                                js: "0.10.0",
                                android: "2.0.1",
                                ios: "2.0.0",
                                macos: "0.1.0"
                            }
                        }
                    },
                    sky: {
                        doc: "A spherical dome around the map that is always rendered behind all other layers.",
                        "sdk-support": {
                            "basic functionality": {
                                js: "2.0.0",
                                ios: "10.0.0",
                                android: "10.0.0"
                            }
                        }
                    }
                },
                doc: "Rendering type of this layer.",
                required: !0
            },
            metadata: {
                type: "*",
                doc: "Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'."
            },
            source: {
                type: "string",
                doc: "Name of a source description to be used for this layer. Required for all layer types except `background`."
            },
            "source-layer": {
                type: "string",
                doc: "Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources."
            },
            minzoom: {
                type: "number",
                minimum: 0,
                maximum: 24,
                doc: "The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden."
            },
            maxzoom: {
                type: "number",
                minimum: 0,
                maximum: 24,
                doc: "The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden."
            },
            filter: {
                type: "filter",
                doc: 'An expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The `["feature-state", ...]` expression is not supported in filter expressions.  The `["pitch"]` and `["distance-from-center"]` expressions are supported only for filter expressions on the symbol layer.'
            },
            layout: {
                type: "layout",
                doc: "Layout properties for the layer."
            },
            paint: {
                type: "paint",
                doc: "Default paint properties for this layer."
            }
        },
        Ri = ["layout_fill", "layout_line", "layout_circle", "layout_heatmap", "layout_fill-extrusion", "layout_symbol", "layout_raster", "layout_hillshade", "layout_background", "layout_sky"],
        Oi = {
            visibility: {
                type: "enum",
                values: {
                    visible: {
                        doc: "The layer is shown."
                    },
                    none: {
                        doc: "The layer is not shown."
                    }
                },
                default: "visible",
                doc: "Whether this layer is displayed.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                "property-type": "constant"
            }
        },
        qi = {
            visibility: {
                type: "enum",
                values: {
                    visible: {
                        doc: "The layer is shown."
                    },
                    none: {
                        doc: "The layer is not shown."
                    }
                },
                default: "visible",
                doc: "Whether this layer is displayed.",
                "sdk-support": {
                    "basic functionality": {
                        js: "2.0.0",
                        ios: "10.0.0",
                        android: "10.0.0"
                    }
                },
                "property-type": "constant"
            }
        },
        Li = {
            "fill-sort-key": {
                type: "number",
                doc: "Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.",
                "sdk-support": {
                    "basic functionality": {
                        js: "1.2.0",
                        android: "9.1.0",
                        ios: "5.8.0",
                        macos: "0.15.0"
                    },
                    "data-driven styling": {
                        js: "1.2.0",
                        android: "9.1.0",
                        ios: "5.8.0",
                        macos: "0.15.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            visibility: {
                type: "enum",
                values: {
                    visible: {
                        doc: "The layer is shown."
                    },
                    none: {
                        doc: "The layer is not shown."
                    }
                },
                default: "visible",
                doc: "Whether this layer is displayed.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                "property-type": "constant"
            }
        },
        Ni = {
            "circle-sort-key": {
                type: "number",
                doc: "Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.",
                "sdk-support": {
                    "basic functionality": {
                        js: "1.2.0",
                        android: "9.2.0",
                        ios: "5.9.0",
                        macos: "0.16.0"
                    },
                    "data-driven styling": {
                        js: "1.2.0",
                        android: "9.2.0",
                        ios: "5.9.0",
                        macos: "0.16.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            visibility: {
                type: "enum",
                values: {
                    visible: {
                        doc: "The layer is shown."
                    },
                    none: {
                        doc: "The layer is not shown."
                    }
                },
                default: "visible",
                doc: "Whether this layer is displayed.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                "property-type": "constant"
            }
        },
        Di = {
            visibility: {
                type: "enum",
                values: {
                    visible: {
                        doc: "The layer is shown."
                    },
                    none: {
                        doc: "The layer is not shown."
                    }
                },
                default: "visible",
                doc: "Whether this layer is displayed.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.41.0",
                        android: "6.0.0",
                        ios: "4.0.0",
                        macos: "0.7.0"
                    }
                },
                "property-type": "constant"
            }
        },
        Pi = {
            "line-cap": {
                type: "enum",
                values: {
                    butt: {
                        doc: "A cap with a squared-off end which is drawn to the exact endpoint of the line."
                    },
                    round: {
                        doc: "A cap with a rounded end which is drawn beyond the endpoint of the line at a radius of one-half of the line's width and centered on the endpoint of the line."
                    },
                    square: {
                        doc: "A cap with a squared-off end which is drawn beyond the endpoint of the line at a distance of one-half of the line's width."
                    }
                },
                default: "butt",
                doc: "The display of line endings.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "2.3.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "line-join": {
                type: "enum",
                values: {
                    bevel: {
                        doc: "A join with a squared-off end which is drawn beyond the endpoint of the line at a distance of one-half of the line's width."
                    },
                    round: {
                        doc: "A join with a rounded end which is drawn beyond the endpoint of the line at a radius of one-half of the line's width and centered on the endpoint of the line."
                    },
                    miter: {
                        doc: "A join with a sharp, angled corner which is drawn with the outer sides beyond the endpoint of the path until they meet."
                    }
                },
                default: "miter",
                doc: "The display of lines when joining.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.40.0",
                        android: "5.2.0",
                        ios: "3.7.0",
                        macos: "0.6.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "line-miter-limit": {
                type: "number",
                default: 2,
                doc: "Used to automatically convert miter joins to bevel joins for sharp angles.",
                requires: [{
                    "line-join": "miter"
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "line-round-limit": {
                type: "number",
                default: 1.05,
                doc: "Used to automatically convert round joins to miter joins for shallow angles.",
                requires: [{
                    "line-join": "round"
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "line-sort-key": {
                type: "number",
                doc: "Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.",
                "sdk-support": {
                    "basic functionality": {
                        js: "1.2.0",
                        android: "9.1.0",
                        ios: "5.8.0",
                        macos: "0.15.0"
                    },
                    "data-driven styling": {
                        js: "1.2.0",
                        android: "9.1.0",
                        ios: "5.8.0",
                        macos: "0.15.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            visibility: {
                type: "enum",
                values: {
                    visible: {
                        doc: "The layer is shown."
                    },
                    none: {
                        doc: "The layer is not shown."
                    }
                },
                default: "visible",
                doc: "Whether this layer is displayed.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                "property-type": "constant"
            }
        },
        Mi = {
            "symbol-placement": {
                type: "enum",
                values: {
                    point: {
                        doc: "The label is placed at the point where the geometry is located."
                    },
                    line: {
                        doc: "The label is placed along the line of the geometry. Can only be used on `LineString` and `Polygon` geometries."
                    },
                    "line-center": {
                        doc: "The label is placed at the center of the line of the geometry. Can only be used on `LineString` and `Polygon` geometries. Note that a single feature in a vector tile may contain multiple line geometries."
                    }
                },
                default: "point",
                doc: "Label placement relative to its geometry.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "`line-center` value": {
                        js: "0.47.0",
                        android: "6.4.0",
                        ios: "4.3.0",
                        macos: "0.10.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "symbol-spacing": {
                type: "number",
                default: 250,
                minimum: 1,
                units: "pixels",
                doc: "Distance between two symbol anchors.",
                requires: [{
                    "symbol-placement": "line"
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "symbol-avoid-edges": {
                type: "boolean",
                default: !1,
                doc: "If true, the symbols will not cross tile edges to avoid mutual collisions. Recommended in layers that don't have enough padding in the vector tile to prevent collisions, or if it is a point symbol layer placed after a line symbol layer. When using a client that supports global collision detection, like Mapbox GL JS version 0.42.0 or greater, enabling this property is not needed to prevent clipped labels at tile boundaries.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "symbol-sort-key": {
                type: "number",
                doc: "Sorts features in ascending order based on this value. Features with lower sort keys are drawn and placed first.  When `icon-allow-overlap` or `text-allow-overlap` is `false`, features with a lower sort key will have priority during placement. When `icon-allow-overlap` or `text-allow-overlap` is set to `true`, features with a higher sort key will overlap over features with a lower sort key.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.53.0",
                        android: "7.4.0",
                        ios: "4.11.0",
                        macos: "0.14.0"
                    },
                    "data-driven styling": {
                        js: "0.53.0",
                        android: "7.4.0",
                        ios: "4.11.0",
                        macos: "0.14.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "symbol-z-order": {
                type: "enum",
                values: {
                    auto: {
                        doc: "Sorts symbols by `symbol-sort-key` if set. Otherwise, sorts symbols by their y-position relative to the viewport if `icon-allow-overlap` or `text-allow-overlap` is set to `true` or `icon-ignore-placement` or `text-ignore-placement` is `false`."
                    },
                    "viewport-y": {
                        doc: "Sorts symbols by their y-position relative to the viewport if `icon-allow-overlap` or `text-allow-overlap` is set to `true` or `icon-ignore-placement` or `text-ignore-placement` is `false`."
                    },
                    source: {
                        doc: "Sorts symbols by `symbol-sort-key` if set. Otherwise, no sorting is applied; symbols are rendered in the same order as the source data."
                    }
                },
                default: "auto",
                doc: "Determines whether overlapping symbols in the same layer are rendered in the order that they appear in the data source or by their y-position relative to the viewport. To control the order and prioritization of symbols otherwise, use `symbol-sort-key`.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.49.0",
                        android: "6.6.0",
                        ios: "4.5.0",
                        macos: "0.12.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-allow-overlap": {
                type: "boolean",
                default: !1,
                doc: "If true, the icon will be visible even if it collides with other previously drawn symbols.",
                requires: ["icon-image"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-ignore-placement": {
                type: "boolean",
                default: !1,
                doc: "If true, other symbols can be visible even if they collide with the icon.",
                requires: ["icon-image"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-optional": {
                type: "boolean",
                default: !1,
                doc: "If true, text will display without their corresponding icons when the icon collides with other symbols and the text does not.",
                requires: ["icon-image", "text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-rotation-alignment": {
                type: "enum",
                values: {
                    map: {
                        doc: "When `symbol-placement` is set to `point`, aligns icons east-west. When `symbol-placement` is set to `line` or `line-center`, aligns icon x-axes with the line."
                    },
                    viewport: {
                        doc: "Produces icons whose x-axes are aligned with the x-axis of the viewport, regardless of the value of `symbol-placement`."
                    },
                    auto: {
                        doc: "When `symbol-placement` is set to `point`, this is equivalent to `viewport`. When `symbol-placement` is set to `line` or `line-center`, this is equivalent to `map`."
                    }
                },
                default: "auto",
                doc: "In combination with `symbol-placement`, determines the rotation behavior of icons.",
                requires: ["icon-image"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "`auto` value": {
                        js: "0.25.0",
                        android: "4.2.0",
                        ios: "3.4.0",
                        macos: "0.3.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-size": {
                type: "number",
                default: 1,
                minimum: 0,
                units: "factor of the original icon size",
                doc: "Scales the original size of the icon by the provided factor. The new pixel size of the image will be the original pixel size multiplied by `icon-size`. 1 is the original size; 3 triples the size of the image.",
                requires: ["icon-image"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.35.0",
                        android: "5.1.0",
                        ios: "3.6.0",
                        macos: "0.5.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "icon-text-fit": {
                type: "enum",
                values: {
                    none: {
                        doc: "The icon is displayed at its intrinsic aspect ratio."
                    },
                    width: {
                        doc: "The icon is scaled in the x-dimension to fit the width of the text."
                    },
                    height: {
                        doc: "The icon is scaled in the y-dimension to fit the height of the text."
                    },
                    both: {
                        doc: "The icon is scaled in both x- and y-dimensions."
                    }
                },
                default: "none",
                doc: "Scales the icon to fit around the associated text.",
                requires: ["icon-image", "text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.21.0",
                        android: "4.2.0",
                        ios: "3.4.0",
                        macos: "0.2.1"
                    },
                    "stretchable icons": {
                        js: "1.6.0",
                        android: "9.2.0",
                        ios: "5.8.0",
                        macos: "0.15.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-text-fit-padding": {
                type: "array",
                value: "number",
                length: 4,
                default: [0, 0, 0, 0],
                units: "pixels",
                doc: "Size of the additional area added to dimensions determined by `icon-text-fit`, in clockwise order: top, right, bottom, left.",
                requires: ["icon-image", "text-field", {
                    "icon-text-fit": ["both", "width", "height"]
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.21.0",
                        android: "4.2.0",
                        ios: "3.4.0",
                        macos: "0.2.1"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-image": {
                type: "resolvedImage",
                doc: "Name of image in sprite to use for drawing an image background.",
                tokens: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.35.0",
                        android: "5.1.0",
                        ios: "3.6.0",
                        macos: "0.5.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "icon-rotate": {
                type: "number",
                default: 0,
                period: 360,
                units: "degrees",
                doc: "Rotates the icon clockwise.",
                requires: ["icon-image"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.21.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "icon-padding": {
                type: "number",
                default: 2,
                minimum: 0,
                units: "pixels",
                doc: "Size of the additional area around the icon bounding box used for detecting symbol collisions.",
                requires: ["icon-image"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-keep-upright": {
                type: "boolean",
                default: !1,
                doc: "If true, the icon may be flipped to prevent it from being rendered upside-down.",
                requires: ["icon-image", {
                    "icon-rotation-alignment": "map"
                }, {
                    "symbol-placement": ["line", "line-center"]
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-offset": {
                type: "array",
                value: "number",
                length: 2,
                default: [0, 0],
                doc: "Offset distance of icon from its anchor. Positive values indicate right and down, while negative values indicate left and up. Each component is multiplied by the value of `icon-size` to obtain the final offset in pixels. When combined with `icon-rotate` the offset will be as if the rotated direction was up.",
                requires: ["icon-image"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.29.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "icon-anchor": {
                type: "enum",
                values: {
                    center: {
                        doc: "The center of the icon is placed closest to the anchor."
                    },
                    left: {
                        doc: "The left side of the icon is placed closest to the anchor."
                    },
                    right: {
                        doc: "The right side of the icon is placed closest to the anchor."
                    },
                    top: {
                        doc: "The top of the icon is placed closest to the anchor."
                    },
                    bottom: {
                        doc: "The bottom of the icon is placed closest to the anchor."
                    },
                    "top-left": {
                        doc: "The top left corner of the icon is placed closest to the anchor."
                    },
                    "top-right": {
                        doc: "The top right corner of the icon is placed closest to the anchor."
                    },
                    "bottom-left": {
                        doc: "The bottom left corner of the icon is placed closest to the anchor."
                    },
                    "bottom-right": {
                        doc: "The bottom right corner of the icon is placed closest to the anchor."
                    }
                },
                default: "center",
                doc: "Part of the icon placed closest to the anchor.",
                requires: ["icon-image"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.40.0",
                        android: "5.2.0",
                        ios: "3.7.0",
                        macos: "0.6.0"
                    },
                    "data-driven styling": {
                        js: "0.40.0",
                        android: "5.2.0",
                        ios: "3.7.0",
                        macos: "0.6.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "icon-pitch-alignment": {
                type: "enum",
                values: {
                    map: {
                        doc: "The icon is aligned to the plane of the map."
                    },
                    viewport: {
                        doc: "The icon is aligned to the plane of the viewport."
                    },
                    auto: {
                        doc: "Automatically matches the value of `icon-rotation-alignment`."
                    }
                },
                default: "auto",
                doc: "Orientation of icon when map is pitched.",
                requires: ["icon-image"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.39.0",
                        android: "5.2.0",
                        ios: "3.7.0",
                        macos: "0.6.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-pitch-alignment": {
                type: "enum",
                values: {
                    map: {
                        doc: "The text is aligned to the plane of the map."
                    },
                    viewport: {
                        doc: "The text is aligned to the plane of the viewport."
                    },
                    auto: {
                        doc: "Automatically matches the value of `text-rotation-alignment`."
                    }
                },
                default: "auto",
                doc: "Orientation of text when map is pitched.",
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.21.0",
                        android: "4.2.0",
                        ios: "3.4.0",
                        macos: "0.2.1"
                    },
                    "`auto` value": {
                        js: "0.25.0",
                        android: "4.2.0",
                        ios: "3.4.0",
                        macos: "0.3.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-rotation-alignment": {
                type: "enum",
                values: {
                    map: {
                        doc: "When `symbol-placement` is set to `point`, aligns text east-west. When `symbol-placement` is set to `line` or `line-center`, aligns text x-axes with the line."
                    },
                    viewport: {
                        doc: "Produces glyphs whose x-axes are aligned with the x-axis of the viewport, regardless of the value of `symbol-placement`."
                    },
                    auto: {
                        doc: "When `symbol-placement` is set to `point`, this is equivalent to `viewport`. When `symbol-placement` is set to `line` or `line-center`, this is equivalent to `map`."
                    }
                },
                default: "auto",
                doc: "In combination with `symbol-placement`, determines the rotation behavior of the individual glyphs forming the text.",
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "`auto` value": {
                        js: "0.25.0",
                        android: "4.2.0",
                        ios: "3.4.0",
                        macos: "0.3.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-field": {
                type: "formatted",
                default: "",
                tokens: !0,
                doc: "Value to use for a text label. If a plain `string` is provided, it will be treated as a `formatted` with default/inherited formatting options. SDF images are not supported in formatted text and will be ignored.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.33.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-font": {
                type: "array",
                value: "string",
                default: ["Open Sans Regular", "Arial Unicode MS Regular"],
                doc: "Font stack to use for displaying text.",
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.43.0",
                        android: "6.0.0",
                        ios: "4.0.0",
                        macos: "0.7.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-size": {
                type: "number",
                default: 16,
                minimum: 0,
                units: "pixels",
                doc: "Font size.",
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.35.0",
                        android: "5.1.0",
                        ios: "3.6.0",
                        macos: "0.5.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-max-width": {
                type: "number",
                default: 10,
                minimum: 0,
                units: "ems",
                doc: "The maximum line width for text wrapping.",
                requires: ["text-field", {
                    "symbol-placement": ["point"]
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.40.0",
                        android: "5.2.0",
                        ios: "3.7.0",
                        macos: "0.6.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-line-height": {
                type: "number",
                default: 1.2,
                units: "ems",
                doc: "Text leading value for multi-line text.",
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "2.3.0",
                        android: "10.0.0",
                        ios: "10.0.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-letter-spacing": {
                type: "number",
                default: 0,
                units: "ems",
                doc: "Text tracking amount.",
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.40.0",
                        android: "5.2.0",
                        ios: "3.7.0",
                        macos: "0.6.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-justify": {
                type: "enum",
                values: {
                    auto: {
                        doc: "The text is aligned towards the anchor position."
                    },
                    left: {
                        doc: "The text is aligned to the left."
                    },
                    center: {
                        doc: "The text is centered."
                    },
                    right: {
                        doc: "The text is aligned to the right."
                    }
                },
                default: "center",
                doc: "Text justification options.",
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.39.0",
                        android: "5.2.0",
                        ios: "3.7.0",
                        macos: "0.6.0"
                    },
                    auto: {
                        js: "0.54.0",
                        android: "7.4.0",
                        ios: "4.10.0",
                        macos: "0.14.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-radial-offset": {
                type: "number",
                units: "ems",
                default: 0,
                doc: "Radial offset of text, in the direction of the symbol's anchor. Useful in combination with `text-variable-anchor`, which defaults to using the two-dimensional `text-offset` if present.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.54.0",
                        android: "7.4.0",
                        ios: "4.10.0",
                        macos: "0.14.0"
                    },
                    "data-driven styling": {
                        js: "0.54.0",
                        android: "7.4.0",
                        ios: "4.10.0",
                        macos: "0.14.0"
                    }
                },
                requires: ["text-field"],
                "property-type": "data-driven",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                }
            },
            "text-variable-anchor": {
                type: "array",
                value: "enum",
                values: {
                    center: {
                        doc: "The center of the text is placed closest to the anchor."
                    },
                    left: {
                        doc: "The left side of the text is placed closest to the anchor."
                    },
                    right: {
                        doc: "The right side of the text is placed closest to the anchor."
                    },
                    top: {
                        doc: "The top of the text is placed closest to the anchor."
                    },
                    bottom: {
                        doc: "The bottom of the text is placed closest to the anchor."
                    },
                    "top-left": {
                        doc: "The top left corner of the text is placed closest to the anchor."
                    },
                    "top-right": {
                        doc: "The top right corner of the text is placed closest to the anchor."
                    },
                    "bottom-left": {
                        doc: "The bottom left corner of the text is placed closest to the anchor."
                    },
                    "bottom-right": {
                        doc: "The bottom right corner of the text is placed closest to the anchor."
                    }
                },
                requires: ["text-field", {
                    "symbol-placement": ["point"]
                }],
                doc: "To increase the chance of placing high-priority labels on the map, you can provide an array of `text-anchor` locations: the renderer will attempt to place the label at each location, in order, before moving onto the next label. Use `text-justify: auto` to choose justification based on anchor position. To apply an offset, use the `text-radial-offset` or the two-dimensional `text-offset`.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.54.0",
                        android: "7.4.0",
                        ios: "4.10.0",
                        macos: "0.14.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-anchor": {
                type: "enum",
                values: {
                    center: {
                        doc: "The center of the text is placed closest to the anchor."
                    },
                    left: {
                        doc: "The left side of the text is placed closest to the anchor."
                    },
                    right: {
                        doc: "The right side of the text is placed closest to the anchor."
                    },
                    top: {
                        doc: "The top of the text is placed closest to the anchor."
                    },
                    bottom: {
                        doc: "The bottom of the text is placed closest to the anchor."
                    },
                    "top-left": {
                        doc: "The top left corner of the text is placed closest to the anchor."
                    },
                    "top-right": {
                        doc: "The top right corner of the text is placed closest to the anchor."
                    },
                    "bottom-left": {
                        doc: "The bottom left corner of the text is placed closest to the anchor."
                    },
                    "bottom-right": {
                        doc: "The bottom right corner of the text is placed closest to the anchor."
                    }
                },
                default: "center",
                doc: "Part of the text placed closest to the anchor.",
                requires: ["text-field", {
                    "!": "text-variable-anchor"
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.39.0",
                        android: "5.2.0",
                        ios: "3.7.0",
                        macos: "0.6.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-max-angle": {
                type: "number",
                default: 45,
                units: "degrees",
                doc: "Maximum angle change between adjacent characters.",
                requires: ["text-field", {
                    "symbol-placement": ["line", "line-center"]
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-writing-mode": {
                type: "array",
                value: "enum",
                values: {
                    horizontal: {
                        doc: "If a text's language supports horizontal writing mode, symbols would be laid out horizontally."
                    },
                    vertical: {
                        doc: "If a text's language supports vertical writing mode, symbols would be laid out vertically."
                    }
                },
                doc: "The property allows control over a symbol's orientation. Note that the property values act as a hint, so that a symbol whose language doesn’t support the provided orientation will be laid out in its natural orientation. Example: English point symbol will be rendered horizontally even if array value contains single 'vertical' enum value. For symbol with point placement, the order of elements in an array define priority order for the placement of an orientation variant. For symbol with line placement, the default text writing mode is either ['horizontal', 'vertical'] or ['vertical', 'horizontal'], the order doesn't affect the placement.",
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "1.3.0",
                        android: "8.3.0",
                        ios: "5.3.0",
                        macos: "0.15.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-rotate": {
                type: "number",
                default: 0,
                period: 360,
                units: "degrees",
                doc: "Rotates the text clockwise.",
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.35.0",
                        android: "5.1.0",
                        ios: "3.6.0",
                        macos: "0.5.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-padding": {
                type: "number",
                default: 2,
                minimum: 0,
                units: "pixels",
                doc: "Size of the additional area around the text bounding box used for detecting symbol collisions.",
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-keep-upright": {
                type: "boolean",
                default: !0,
                doc: "If true, the text may be flipped vertically to prevent it from being rendered upside-down.",
                requires: ["text-field", {
                    "text-rotation-alignment": "map"
                }, {
                    "symbol-placement": ["line", "line-center"]
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-transform": {
                type: "enum",
                values: {
                    none: {
                        doc: "The text is not altered."
                    },
                    uppercase: {
                        doc: "Forces all letters to be displayed in uppercase."
                    },
                    lowercase: {
                        doc: "Forces all letters to be displayed in lowercase."
                    }
                },
                default: "none",
                doc: "Specifies how to capitalize text, similar to the CSS `text-transform` property.",
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.33.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-offset": {
                type: "array",
                doc: "Offset distance of text from its anchor. Positive values indicate right and down, while negative values indicate left and up. If used with text-variable-anchor, input values will be taken as absolute values. Offsets along the x- and y-axis will be applied automatically based on the anchor position.",
                value: "number",
                units: "ems",
                length: 2,
                default: [0, 0],
                requires: ["text-field", {
                    "!": "text-radial-offset"
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.35.0",
                        android: "5.1.0",
                        ios: "3.6.0",
                        macos: "0.5.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-allow-overlap": {
                type: "boolean",
                default: !1,
                doc: "If true, the text will be visible even if it collides with other previously drawn symbols.",
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-ignore-placement": {
                type: "boolean",
                default: !1,
                doc: "If true, other symbols can be visible even if they collide with the text.",
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-optional": {
                type: "boolean",
                default: !1,
                doc: "If true, icons will display without their corresponding text when the text collides with other symbols and the icon does not.",
                requires: ["text-field", "icon-image"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            visibility: {
                type: "enum",
                values: {
                    visible: {
                        doc: "The layer is shown."
                    },
                    none: {
                        doc: "The layer is not shown."
                    }
                },
                default: "visible",
                doc: "Whether this layer is displayed.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                "property-type": "constant"
            }
        },
        $i = {
            visibility: {
                type: "enum",
                values: {
                    visible: {
                        doc: "The layer is shown."
                    },
                    none: {
                        doc: "The layer is not shown."
                    }
                },
                default: "visible",
                doc: "Whether this layer is displayed.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                "property-type": "constant"
            }
        },
        Fi = {
            visibility: {
                type: "enum",
                values: {
                    visible: {
                        doc: "The layer is shown."
                    },
                    none: {
                        doc: "The layer is not shown."
                    }
                },
                default: "visible",
                doc: "Whether this layer is displayed.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.43.0",
                        android: "6.0.0",
                        ios: "4.0.0",
                        macos: "0.7.0"
                    }
                },
                "property-type": "constant"
            }
        },
        Ui = {
            type: "array",
            value: "*",
            doc: "A filter selects specific features from a layer."
        },
        Bi = {
            type: "boolean",
            doc: 'Expression which determines whether or not to display a symbol. Symbols support dynamic filtering, meaning this expression can use the `["pitch"]` and `["distance-from-center"]` expressions to reference the current state of the view.',
            default: !1,
            transition: !1,
            "property-type": "data-driven",
            expression: {
                interpolated: !1,
                parameters: ["zoom", "feature", "pitch", "distance-from-center"]
            }
        },
        Wi = {
            type: "boolean",
            doc: 'Expression which determines whether or not to display a polygon. Fill layer does NOT support dynamic filtering, meaning this expression can NOT use the `["pitch"]` and `["distance-from-center"]` expressions to reference the current state of the view.',
            default: !1,
            transition: !1,
            "property-type": "data-driven",
            expression: {
                interpolated: !1,
                parameters: ["zoom", "feature"]
            }
        },
        Ji = {
            type: "boolean",
            doc: 'Expression which determines whether or not to display a Polygon or LineString. Line layer does NOT support dynamic filtering, meaning this expression can NOT use the `["pitch"]` and `["distance-from-center"]` expressions to reference the current state of the view.',
            default: !1,
            transition: !1,
            "property-type": "data-driven",
            expression: {
                interpolated: !1,
                parameters: ["zoom", "feature"]
            }
        },
        Vi = {
            type: "boolean",
            doc: 'Expression which determines whether or not to display a circle. Circle layer does NOT support dynamic filtering, meaning this expression can NOT use the `["pitch"]` and `["distance-from-center"]` expressions to reference the current state of the view.',
            default: !1,
            transition: !1,
            "property-type": "data-driven",
            expression: {
                interpolated: !1,
                parameters: ["zoom", "feature"]
            }
        },
        Hi = {
            type: "boolean",
            doc: 'Expression used to determine whether a point is being displayed or not. Heatmap layer does NOT support dynamic filtering, meaning this expression can NOT use the `["pitch"]` and `["distance-from-center"]` expressions to reference the current state of the view.',
            default: !1,
            transition: !1,
            "property-type": "data-driven",
            expression: {
                interpolated: !1,
                parameters: ["zoom", "feature"]
            }
        },
        Gi = {
            type: "enum",
            values: {
                "==": {
                    doc: '`["==", key, value]` equality: `feature[key] = value`'
                },
                "!=": {
                    doc: '`["!=", key, value]` inequality: `feature[key] ≠ value`'
                },
                ">": {
                    doc: '`[">", key, value]` greater than: `feature[key] > value`'
                },
                ">=": {
                    doc: '`[">=", key, value]` greater than or equal: `feature[key] ≥ value`'
                },
                "<": {
                    doc: '`["<", key, value]` less than: `feature[key] < value`'
                },
                "<=": {
                    doc: '`["<=", key, value]` less than or equal: `feature[key] ≤ value`'
                },
                in: {
                    doc: '`["in", key, v0, ..., vn]` set inclusion: `feature[key] ∈ {v0, ..., vn}`'
                },
                "!in": {
                    doc: '`["!in", key, v0, ..., vn]` set exclusion: `feature[key] ∉ {v0, ..., vn}`'
                },
                all: {
                    doc: '`["all", f0, ..., fn]` logical `AND`: `f0 ∧ ... ∧ fn`'
                },
                any: {
                    doc: '`["any", f0, ..., fn]` logical `OR`: `f0 ∨ ... ∨ fn`'
                },
                none: {
                    doc: '`["none", f0, ..., fn]` logical `NOR`: `¬f0 ∧ ... ∧ ¬fn`'
                },
                has: {
                    doc: '`["has", key]` `feature[key]` exists'
                },
                "!has": {
                    doc: '`["!has", key]` `feature[key]` does not exist'
                },
                within: {
                    doc: '`["within", object]` feature geometry is within object geometry'
                }
            },
            doc: "The filter operator."
        },
        Zi = {
            type: "enum",
            values: {
                Point: {
                    doc: "Filter to point geometries."
                },
                LineString: {
                    doc: "Filter to line geometries."
                },
                Polygon: {
                    doc: "Filter to polygon geometries."
                }
            },
            doc: "The geometry type for the filter to select."
        },
        Xi = {
            type: "array",
            minimum: 0,
            maximum: 24,
            value: ["number", "color"],
            length: 2,
            doc: "Zoom level and value pair."
        },
        Yi = {
            type: "array",
            value: "*",
            minimum: 1,
            doc: "An expression defines a function that can be used for data-driven style properties or feature filters."
        },
        Ki = {
            doc: "",
            type: "enum",
            values: {
                let: {
                    doc: 'Binds expressions to named variables, which can then be referenced in the result expression using ["var", "variable_name"].',
                    group: "Variable binding",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                var: {
                    doc: 'References variable bound using "let".',
                    group: "Variable binding",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                literal: {
                    doc: "Provides a literal array or object value.",
                    group: "Types",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                array: {
                    doc: "Asserts that the input is an array (optionally with a specific item type and length).  If, when the input expression is evaluated, it is not of the asserted type, then this assertion will cause the whole expression to be aborted.",
                    group: "Types",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                at: {
                    doc: "Retrieves an item from an array.",
                    group: "Lookup",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                in: {
                    doc: "Determines whether an item exists in an array or a substring exists in a string. In the specific case when the second and third arguments are string literals, you must wrap at least one of them in a [`literal`](#types-literal) expression to hint correct interpretation to the [type system](#type-system).",
                    group: "Lookup",
                    "sdk-support": {
                        "basic functionality": {
                            js: "1.6.0",
                            android: "9.1.0",
                            ios: "5.8.0",
                            macos: "0.15.0"
                        }
                    }
                },
                "index-of": {
                    doc: "Returns the first position at which an item can be found in an array or a substring can be found in a string, or `-1` if the input cannot be found. Accepts an optional index from where to begin the search.",
                    group: "Lookup",
                    "sdk-support": {
                        "basic functionality": {
                            js: "1.10.0",
                            android: "10.0.0",
                            ios: "10.0.0"
                        }
                    }
                },
                slice: {
                    doc: "Returns an item from an array or a substring from a string from a specified start index, or between a start index and an end index if set. The return value is inclusive of the start index but not of the end index.",
                    group: "Lookup",
                    "sdk-support": {
                        "basic functionality": {
                            js: "1.10.0",
                            android: "10.0.0",
                            ios: "10.0.0"
                        }
                    }
                },
                case: {
                    doc: "Selects the first output whose corresponding test condition evaluates to true, or the fallback value otherwise.",
                    group: "Decision",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                match: {
                    doc: 'Selects the output for which the label value matches the input value, or the fallback value if no match is found. The input can be any expression (for example, `["get", "building_type"]`). Each label must be unique, and must be either:\n - a single literal value; or\n - an array of literal values, the values of which must be all strings or all numbers (for example `[100, 101]` or `["c", "b"]`).\n\nThe input matches if any of the values in the array matches using strict equality, similar to the `"in"` operator.\nIf the input type does not match the type of the labels, the result will be the fallback value.',
                    group: "Decision",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                coalesce: {
                    doc: "Evaluates each expression in turn until the first valid value is obtained. Invalid values are `null` and [`'image'`](#types-image) expressions that are unavailable in the style. If all values are invalid, `coalesce` returns the first value listed.",
                    group: "Decision",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                step: {
                    doc: 'Produces discrete, stepped results by evaluating a piecewise-constant function defined by pairs of input and output values ("stops"). The `input` may be any numeric expression (e.g., `["get", "population"]`). Stop inputs must be numeric literals in strictly ascending order. Returns the output value of the stop just less than the input, or the first output if the input is less than the first stop.',
                    group: "Ramps, scales, curves",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.42.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                interpolate: {
                    doc: 'Produces continuous, smooth results by interpolating between pairs of input and output values ("stops"). The `input` may be any numeric expression (e.g., `["get", "population"]`). Stop inputs must be numeric literals in strictly ascending order. The output type must be `number`, `array<number>`, or `color`.\n\nInterpolation types:\n- `["linear"]`: Interpolates linearly between the pair of stops just less than and just greater than the input.\n- `["exponential", base]`: Interpolates exponentially between the stops just less than and just greater than the input. `base` controls the rate at which the output increases: higher values make the output increase more towards the high end of the range. With values close to 1 the output increases linearly.\n- `["cubic-bezier", x1, y1, x2, y2]`: Interpolates using the cubic bezier curve defined by the given control points.',
                    group: "Ramps, scales, curves",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.42.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                "interpolate-hcl": {
                    doc: 'Produces continuous, smooth results by interpolating between pairs of input and output values ("stops"). Works like `interpolate`, but the output type must be `color`, and the interpolation is performed in the Hue-Chroma-Luminance color space.',
                    group: "Ramps, scales, curves",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.49.0"
                        }
                    }
                },
                "interpolate-lab": {
                    doc: 'Produces continuous, smooth results by interpolating between pairs of input and output values ("stops"). Works like `interpolate`, but the output type must be `color`, and the interpolation is performed in the CIELAB color space.',
                    group: "Ramps, scales, curves",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.49.0"
                        }
                    }
                },
                ln2: {
                    doc: "Returns mathematical constant ln(2).",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                pi: {
                    doc: "Returns the mathematical constant pi.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                e: {
                    doc: "Returns the mathematical constant e.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                typeof: {
                    doc: "Returns a string describing the type of the given value.",
                    group: "Types",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                string: {
                    doc: "Asserts that the input value is a string. If multiple values are provided, each one is evaluated in order until a string is obtained. If none of the inputs are strings, the expression is an error.",
                    group: "Types",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                number: {
                    doc: "Asserts that the input value is a number. If multiple values are provided, each one is evaluated in order until a number is obtained. If none of the inputs are numbers, the expression is an error.",
                    group: "Types",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                boolean: {
                    doc: "Asserts that the input value is a boolean. If multiple values are provided, each one is evaluated in order until a boolean is obtained. If none of the inputs are booleans, the expression is an error.",
                    group: "Types",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                object: {
                    doc: "Asserts that the input value is an object. If multiple values are provided, each one is evaluated in order until an object is obtained. If none of the inputs are objects, the expression is an error.",
                    group: "Types",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                collator: {
                    doc: "Returns a `collator` for use in locale-dependent comparison operations. The `case-sensitive` and `diacritic-sensitive` options default to `false`. The `locale` argument specifies the IETF language tag of the locale to use. If none is provided, the default locale is used. If the requested locale is not available, the `collator` will use a system-defined fallback locale. Use `resolved-locale` to test the results of locale fallback behavior.",
                    group: "Types",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.45.0",
                            android: "6.5.0",
                            ios: "4.2.0",
                            macos: "0.9.0"
                        }
                    }
                },
                format: {
                    doc: 'Returns a `formatted` string for displaying mixed-format text in the `text-field` property. The input may contain a string literal or expression, including an [`\'image\'`](#types-image) expression. Strings may be followed by a style override object that supports the following properties:\n- `"text-font"`: Overrides the font stack specified by the root layout property.\n- `"text-color"`: Overrides the color specified by the root paint property.\n- `"font-scale"`: Applies a scaling factor on `text-size` as specified by the root layout property.',
                    group: "Types",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.48.0",
                            android: "6.7.0",
                            ios: "4.6.0",
                            macos: "0.12.0"
                        },
                        "text-font": {
                            js: "0.48.0",
                            android: "6.7.0",
                            ios: "4.6.0",
                            macos: "0.12.0"
                        },
                        "font-scale": {
                            js: "0.48.0",
                            android: "6.7.0",
                            ios: "4.6.0",
                            macos: "0.12.0"
                        },
                        "text-color": {
                            js: "1.3.0",
                            android: "7.3.0",
                            ios: "4.10.0",
                            macos: "0.14.0"
                        },
                        image: {
                            js: "1.6.0",
                            android: "8.6.0",
                            ios: "5.7.0",
                            macos: "0.15.0"
                        }
                    }
                },
                image: {
                    doc: "Returns a [`ResolvedImage`](/mapbox-gl-js/style-spec/types/#resolvedimage) for use in [`icon-image`](/mapbox-gl-js/style-spec/layers/#layout-symbol-icon-image), `*-pattern` entries, and as a section in the [`'format'`](#types-format) expression. A [`'coalesce'`](#coalesce) expression containing `image` expressions will evaluate to the first listed image that is currently in the style. This validation process is synchronous and requires the image to have been added to the style before requesting it in the `'image'` argument.",
                    group: "Types",
                    "sdk-support": {
                        "basic functionality": {
                            js: "1.4.0",
                            android: "8.6.0",
                            ios: "5.7.0",
                            macos: "0.15.0"
                        }
                    }
                },
                "number-format": {
                    doc: "Converts the input number into a string representation using the providing formatting rules. If set, the `locale` argument specifies the locale to use, as a BCP 47 language tag. If set, the `currency` argument specifies an ISO 4217 code to use for currency-style formatting. If set, the `unit` argument specifies a [simple ECMAScript unit](https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier) to use for unit-style formatting. If set, the `min-fraction-digits` and `max-fraction-digits` arguments specify the minimum and maximum number of fractional digits to include.",
                    group: "Types",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.54.0",
                            android: "8.4.0",
                            ios: "5.4.0",
                            macos: "0.15.0"
                        }
                    }
                },
                "to-string": {
                    doc: 'Converts the input value to a string. If the input is `null`, the result is `""`. If the input is a [`boolean`](#types-boolean), the result is `"true"` or `"false"`. If the input is a number, it is converted to a string as specified by the ["NumberToString" algorithm](https://tc39.github.io/ecma262/#sec-tostring-applied-to-the-number-type) of the ECMAScript Language Specification. If the input is a [`color`](#color), it is converted to a string of the form `"rgba(r,g,b,a)"`, where `r`, `g`, and `b` are numerals ranging from 0 to 255, and `a` ranges from 0 to 1. If the input is an [`\'image\'`](#types-image) expression, `\'to-string\'` returns the image name. Otherwise, the input is converted to a string in the format specified by the [`JSON.stringify`](https://tc39.github.io/ecma262/#sec-json.stringify) function of the ECMAScript Language Specification.',
                    group: "Types",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                "to-number": {
                    doc: 'Converts the input value to a number, if possible. If the input is `null` or `false`, the result is 0. If the input is `true`, the result is 1. If the input is a string, it is converted to a number as specified by the ["ToNumber Applied to the String Type" algorithm](https://tc39.github.io/ecma262/#sec-tonumber-applied-to-the-string-type) of the ECMAScript Language Specification. If multiple values are provided, each one is evaluated in order until the first successful conversion is obtained. If none of the inputs can be converted, the expression is an error.',
                    group: "Types",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                "to-boolean": {
                    doc: "Converts the input value to a boolean. The result is `false` when then input is an empty string, 0, `false`, `null`, or `NaN`; otherwise it is `true`.",
                    group: "Types",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                "to-rgba": {
                    doc: "Returns a four-element array containing the input color's red, green, blue, and alpha components, in that order.",
                    group: "Color",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                "to-color": {
                    doc: "Converts the input value to a color. If multiple values are provided, each one is evaluated in order until the first successful conversion is obtained. If none of the inputs can be converted, the expression is an error.",
                    group: "Types",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                rgb: {
                    doc: "Creates a color value from red, green, and blue components, which must range between 0 and 255, and an alpha component of 1. If any component is out of range, the expression is an error.",
                    group: "Color",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                rgba: {
                    doc: "Creates a color value from red, green, blue components, which must range between 0 and 255, and an alpha component which must range between 0 and 1. If any component is out of range, the expression is an error.",
                    group: "Color",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                get: {
                    doc: "Retrieves a property value from the current feature's properties, or from another object if a second argument is provided. Returns `null` if the requested property is missing.",
                    group: "Lookup",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                has: {
                    doc: "Tests for the presence of an property value in the current feature's properties, or from another object if a second argument is provided.",
                    group: "Lookup",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                length: {
                    doc: "Returns the length of an array or string.",
                    group: "Lookup",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                properties: {
                    doc: 'Returns the feature properties object.  Note that in some cases, it may be more efficient to use `["get", "property_name"]` directly.',
                    group: "Feature data",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                "feature-state": {
                    doc: "Retrieves a property value from the current feature's state. Returns `null` if the requested property is not present on the feature's state. A feature's state is not part of the GeoJSON or vector tile data, and must be set programmatically on each feature. Features are identified by their `id` attribute, which must be an integer or a string that can be cast to an integer. Note that [\"feature-state\"] can only be used with paint properties that support data-driven styling.",
                    group: "Feature data",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.46.0",
                            android: "10.0.0",
                            ios: "10.0.0"
                        }
                    }
                },
                "geometry-type": {
                    doc: "Returns the feature's geometry type: `Point`, `LineString` or `Polygon`. `Multi*` feature types return the singular forms.",
                    group: "Feature data",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                id: {
                    doc: "Returns the feature's id, if it has one.",
                    group: "Feature data",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                zoom: {
                    doc: 'Returns the current zoom level.  Note that in style layout and paint properties, ["zoom"] may only appear as the input to a top-level "step" or "interpolate" expression.',
                    group: "Camera",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                pitch: {
                    doc: 'Returns the current pitch in degrees. `["pitch"]` may only be used in the `filter` expression for a `symbol` layer.',
                    group: "Camera",
                    "sdk-support": {
                        "basic functionality": {
                            js: "2.6.0",
                            android: "10.9.0",
                            ios: "10.9.0"
                        }
                    }
                },
                "distance-from-center": {
                    doc: 'Returns the distance of a `symbol` instance from the center of the map. The distance is measured in pixels divided by the height of the map container. It measures 0 at the center, decreases towards the camera and increase away from the camera. For example, if the height of the map is 1000px, a value of -1 means 1000px away from the center towards the camera, and a value of 1 means a distance of 1000px away from the camera from the center. `["distance-from-center"]` may only be used in the `filter` expression for a `symbol` layer.',
                    group: "Camera",
                    "sdk-support": {
                        "basic functionality": {
                            js: "2.6.0",
                            android: "10.9.0",
                            ios: "10.9.0"
                        }
                    }
                },
                "heatmap-density": {
                    doc: "Returns the kernel density estimation of a pixel in a heatmap layer, which is a relative measure of how many data points are crowded around a particular pixel. Can only be used in the `heatmap-color` property.",
                    group: "Heatmap",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                "line-progress": {
                    doc: "Returns the progress along a gradient line. Can only be used in the `line-gradient` property.",
                    group: "Feature data",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.45.0",
                            android: "6.5.0",
                            ios: "4.6.0",
                            macos: "0.12.0"
                        }
                    }
                },
                "sky-radial-progress": {
                    doc: "Returns the distance of a point on the sky from the sun position. Returns 0 at sun position and 1 when the distance reaches `sky-gradient-radius`. Can only be used in the `sky-gradient` property.",
                    group: "sky",
                    "sdk-support": {
                        "basic functionality": {
                            js: "2.0.0",
                            ios: "10.0.0",
                            android: "10.0.0"
                        }
                    }
                },
                accumulated: {
                    doc: "Returns the value of a cluster property accumulated so far. Can only be used in the `clusterProperties` option of a clustered GeoJSON source.",
                    group: "Feature data",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.53.0",
                            android: "8.4.0",
                            ios: "5.5.0",
                            macos: "0.15.0"
                        }
                    }
                },
                "+": {
                    doc: "Returns the sum of the inputs.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                "*": {
                    doc: "Returns the product of the inputs.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                "-": {
                    doc: "For two inputs, returns the result of subtracting the second input from the first. For a single input, returns the result of subtracting it from 0.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                "/": {
                    doc: "Returns the result of floating point division of the first input by the second.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                "%": {
                    doc: "Returns the remainder after integer division of the first input by the second.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                "^": {
                    doc: "Returns the result of raising the first input to the power specified by the second.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                sqrt: {
                    doc: "Returns the square root of the input.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.42.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                log10: {
                    doc: "Returns the base-ten logarithm of the input.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                ln: {
                    doc: "Returns the natural logarithm of the input.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                log2: {
                    doc: "Returns the base-two logarithm of the input.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                sin: {
                    doc: "Returns the sine of the input.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                cos: {
                    doc: "Returns the cosine of the input.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                tan: {
                    doc: "Returns the tangent of the input.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                asin: {
                    doc: "Returns the arcsine of the input.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                acos: {
                    doc: "Returns the arccosine of the input.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                atan: {
                    doc: "Returns the arctangent of the input.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                min: {
                    doc: "Returns the minimum value of the inputs.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                max: {
                    doc: "Returns the maximum value of the inputs.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                round: {
                    doc: 'Rounds the input to the nearest integer. Halfway values are rounded away from zero. For example, `["round", -1.5]` evaluates to -2.',
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.45.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                abs: {
                    doc: "Returns the absolute value of the input.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.45.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                ceil: {
                    doc: "Returns the smallest integer that is greater than or equal to the input.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.45.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                floor: {
                    doc: "Returns the largest integer that is less than or equal to the input.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.45.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                distance: {
                    doc: "Returns the shortest distance in meters between the evaluated feature and the input geometry. The input value can be a valid GeoJSON of type `Point`, `MultiPoint`, `LineString`, `MultiLineString`, `Polygon`, `MultiPolygon`, `Feature`, or `FeatureCollection`. Distance values returned may vary in precision due to loss in precision from encoding geometries, particularly below zoom level 13.",
                    group: "Math",
                    "sdk-support": {
                        "basic functionality": {
                            android: "9.2.0",
                            ios: "5.9.0",
                            macos: "0.16.0"
                        }
                    }
                },
                "==": {
                    doc: "Returns `true` if the input values are equal, `false` otherwise. The comparison is strictly typed: values of different runtime types are always considered unequal. Cases where the types are known to be different at parse time are considered invalid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
                    group: "Decision",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        },
                        collator: {
                            js: "0.45.0",
                            android: "6.5.0",
                            ios: "4.2.0",
                            macos: "0.9.0"
                        }
                    }
                },
                "!=": {
                    doc: "Returns `true` if the input values are not equal, `false` otherwise. The comparison is strictly typed: values of different runtime types are always considered unequal. Cases where the types are known to be different at parse time are considered invalid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
                    group: "Decision",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        },
                        collator: {
                            js: "0.45.0",
                            android: "6.5.0",
                            ios: "4.2.0",
                            macos: "0.9.0"
                        }
                    }
                },
                ">": {
                    doc: "Returns `true` if the first input is strictly greater than the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
                    group: "Decision",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        },
                        collator: {
                            js: "0.45.0",
                            android: "6.5.0",
                            ios: "4.2.0",
                            macos: "0.9.0"
                        }
                    }
                },
                "<": {
                    doc: "Returns `true` if the first input is strictly less than the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
                    group: "Decision",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        },
                        collator: {
                            js: "0.45.0",
                            android: "6.5.0",
                            ios: "4.2.0",
                            macos: "0.9.0"
                        }
                    }
                },
                ">=": {
                    doc: "Returns `true` if the first input is greater than or equal to the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
                    group: "Decision",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        },
                        collator: {
                            js: "0.45.0",
                            android: "6.5.0",
                            ios: "4.2.0",
                            macos: "0.9.0"
                        }
                    }
                },
                "<=": {
                    doc: "Returns `true` if the first input is less than or equal to the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
                    group: "Decision",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        },
                        collator: {
                            js: "0.45.0",
                            android: "6.5.0",
                            ios: "4.2.0",
                            macos: "0.9.0"
                        }
                    }
                },
                all: {
                    doc: "Returns `true` if all the inputs are `true`, `false` otherwise. The inputs are evaluated in order, and evaluation is short-circuiting: once an input expression evaluates to `false`, the result is `false` and no further input expressions are evaluated.",
                    group: "Decision",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                any: {
                    doc: "Returns `true` if any of the inputs are `true`, `false` otherwise. The inputs are evaluated in order, and evaluation is short-circuiting: once an input expression evaluates to `true`, the result is `true` and no further input expressions are evaluated.",
                    group: "Decision",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                "!": {
                    doc: "Logical negation. Returns `true` if the input is `false`, and `false` if the input is `true`.",
                    group: "Decision",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                within: {
                    doc: "Returns `true` if the evaluated feature is fully contained inside a boundary of the input geometry, `false` otherwise. The input value can be a valid GeoJSON of type `Polygon`, `MultiPolygon`, `Feature`, or `FeatureCollection`. Supported features for evaluation:\n- `Point`: Returns `false` if a point is on the boundary or falls outside the boundary.\n- `LineString`: Returns `false` if any part of a line falls outside the boundary, the line intersects the boundary, or a line's endpoint is on the boundary.",
                    group: "Decision",
                    "sdk-support": {
                        "basic functionality": {
                            js: "1.9.0",
                            android: "9.1.0",
                            ios: "5.8.0",
                            macos: "0.15.0"
                        }
                    }
                },
                "is-supported-script": {
                    doc: "Returns `true` if the input string is expected to render legibly. Returns `false` if the input string contains sections that cannot be rendered without potential loss of meaning (e.g. Indic scripts that require complex text shaping, or right-to-left scripts if the the `mapbox-gl-rtl-text` plugin is not in use in Mapbox GL JS).",
                    group: "String",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.45.0",
                            android: "6.6.0",
                            ios: "4.1.0",
                            macos: "0.8.0"
                        }
                    }
                },
                upcase: {
                    doc: "Returns the input string converted to uppercase. Follows the Unicode Default Case Conversion algorithm and the locale-insensitive case mappings in the Unicode Character Database.",
                    group: "String",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                downcase: {
                    doc: "Returns the input string converted to lowercase. Follows the Unicode Default Case Conversion algorithm and the locale-insensitive case mappings in the Unicode Character Database.",
                    group: "String",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                concat: {
                    doc: "Returns a `string` consisting of the concatenation of the inputs. Each input is converted to a string as if by `to-string`.",
                    group: "String",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.41.0",
                            android: "6.0.0",
                            ios: "4.0.0",
                            macos: "0.7.0"
                        }
                    }
                },
                "resolved-locale": {
                    doc: "Returns the IETF language tag of the locale being used by the provided `collator`. This can be used to determine the default system locale, or to determine if a requested locale was successfully loaded.",
                    group: "String",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.45.0",
                            android: "6.5.0",
                            ios: "4.2.0",
                            macos: "0.9.0"
                        }
                    }
                }
            }
        },
        Qi = {
            range: {
                type: "array",
                default: [.5, 10],
                minimum: -20,
                maximum: 20,
                length: 2,
                value: "number",
                "property-type": "data-constant",
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                doc: "The start and end distance range in which fog fades from fully transparent to fully opaque. The distance to the point at the center of the map is defined as zero, so that negative range values are closer to the camera, and positive values are farther away.",
                example: [.5, 10],
                "sdk-support": {
                    "basic functionality": {
                        js: "2.3.0",
                        android: "10.6.0",
                        ios: "10.6.0"
                    }
                }
            },
            color: {
                type: "color",
                "property-type": "data-constant",
                default: "#ffffff",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                transition: !0,
                doc: "The color of the atmosphere region immediately below the horizon and within the `range` and above the horizon and within `horizon-blend`. Using opacity is recommended only for smoothly transitioning fog on/off as anything less than 100% opacity results in more tiles loaded and drawn.",
                "sdk-support": {
                    "basic functionality": {
                        js: "2.3.0",
                        android: "10.6.0",
                        ios: "10.6.0"
                    }
                }
            },
            "high-color": {
                type: "color",
                "property-type": "data-constant",
                default: "#245cdf",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                transition: !0,
                doc: "The color of the atmosphere region above the horizon, `high-color` extends further above the horizon than the `color` property and its spread can be controlled with `horizon-blend`. The opacity can be set to `0` to remove the high atmosphere color contribution.",
                "sdk-support": {
                    "basic functionality": {
                        js: "2.9.0",
                        android: "10.6.0",
                        ios: "10.6.0"
                    }
                }
            },
            "space-color": {
                type: "color",
                "property-type": "data-constant",
                default: ["interpolate", ["linear"],
                    ["zoom"], 4, "#010b19", 7, "#367ab9"
                ],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                transition: !0,
                doc: "The color of the region above the horizon and after the end of the `horizon-blend` contribution. The opacity can be set to `0` to have a transparent background.",
                "sdk-support": {
                    "basic functionality": {
                        js: "2.9.0",
                        android: "10.6.0",
                        ios: "10.6.0"
                    }
                }
            },
            "horizon-blend": {
                type: "number",
                "property-type": "data-constant",
                default: ["interpolate", ["linear"],
                    ["zoom"], 4, .2, 7, .1
                ],
                minimum: 0,
                maximum: 1,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                transition: !0,
                doc: "Horizon blend applies a smooth fade from the color of the atmosphere to the color of space. A value of zero leaves a sharp transition from atmosphere to space. Increasing the value blends the color of atmosphere into increasingly high angles of the sky.",
                "sdk-support": {
                    "basic functionality": {
                        js: "2.3.0",
                        android: "10.6.0",
                        ios: "10.6.0"
                    }
                }
            },
            "star-intensity": {
                type: "number",
                "property-type": "data-constant",
                default: ["interpolate", ["linear"],
                    ["zoom"], 5, .35, 6, 0
                ],
                minimum: 0,
                maximum: 1,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                transition: !0,
                doc: "A value controlling the star intensity where `0` will show no stars and `1` will show stars at their maximum intensity.",
                "sdk-support": {
                    "basic functionality": {
                        js: "2.9.0",
                        android: "10.6.0",
                        ios: "10.6.0"
                    }
                }
            }
        },
        eo = {
            anchor: {
                type: "enum",
                default: "viewport",
                values: {
                    map: {
                        doc: "The position of the light source is aligned to the rotation of the map."
                    },
                    viewport: {
                        doc: "The position of the light source is aligned to the rotation of the viewport."
                    }
                },
                "property-type": "data-constant",
                transition: !1,
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                doc: "Whether extruded geometries are lit relative to the map or viewport.",
                example: "map",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.27.0",
                        android: "5.1.0",
                        ios: "3.6.0",
                        macos: "0.5.0"
                    }
                }
            },
            position: {
                type: "array",
                default: [1.15, 210, 30],
                length: 3,
                value: "number",
                "property-type": "data-constant",
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                doc: "Position of the light source relative to lit (extruded) geometries, in [r radial coordinate, a azimuthal angle, p polar angle] where r indicates the distance from the center of the base of an object to its light, a indicates the position of the light relative to 0° (0° when `light.anchor` is set to `viewport` corresponds to the top of the viewport, or 0° when `light.anchor` is set to `map` corresponds to due north, and degrees proceed clockwise), and p indicates the height of the light (from 0°, directly above, to 180°, directly below).",
                example: [1.5, 90, 80],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.27.0",
                        android: "5.1.0",
                        ios: "3.6.0",
                        macos: "0.5.0"
                    }
                }
            },
            color: {
                type: "color",
                "property-type": "data-constant",
                default: "#ffffff",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                transition: !0,
                doc: "Color tint for lighting extruded geometries.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.27.0",
                        android: "5.1.0",
                        ios: "3.6.0",
                        macos: "0.5.0"
                    }
                }
            },
            intensity: {
                type: "number",
                "property-type": "data-constant",
                default: .5,
                minimum: 0,
                maximum: 1,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                transition: !0,
                doc: "Intensity of lighting (on a scale from 0 to 1). Higher numbers will present as more extreme contrast.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.27.0",
                        android: "5.1.0",
                        ios: "3.6.0",
                        macos: "0.5.0"
                    }
                }
            }
        },
        to = {
            name: {
                type: "enum",
                values: {
                    albers: {
                        doc: "An Albers equal-area projection centered on the continental United States. You can configure the projection for a different region by setting `center` and `parallels` properties. You may want to set max bounds to constrain the map to the relevant region."
                    },
                    equalEarth: {
                        doc: "An Equal Earth projection."
                    },
                    equirectangular: {
                        doc: "An Equirectangular projection. This projection is very similar to the Plate Carrée projection."
                    },
                    lambertConformalConic: {
                        doc: "A Lambert conformal conic projection. You can configure the projection for a region by setting `center` and `parallels` properties. You may want to set max bounds to constrain the map to the relevant region."
                    },
                    mercator: {
                        doc: "The Mercator projection is the default projection."
                    },
                    naturalEarth: {
                        doc: "A Natural Earth projection."
                    },
                    winkelTripel: {
                        doc: "A Winkel Tripel projection."
                    },
                    globe: {
                        doc: "A globe projection."
                    }
                },
                default: "mercator",
                doc: "The name of the projection to be used for rendering the map.",
                required: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "2.6.0"
                    }
                }
            },
            center: {
                type: "array",
                length: 2,
                value: "number",
                "property-type": "data-constant",
                minimum: [-180, -90],
                maximum: [180, 90],
                transition: !1,
                doc: "The reference longitude and latitude of the projection. `center` takes the form of [lng, lat]. This property is only configurable for conic projections (Albers and Lambert Conformal Conic). All other projections are centered on [0, 0].",
                example: [-96, 37.5],
                requires: [{
                    name: ["albers", "lambertConformalConic"]
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "2.6.0"
                    }
                }
            },
            parallels: {
                type: "array",
                length: 2,
                value: "number",
                "property-type": "data-constant",
                minimum: [-90, -90],
                maximum: [90, 90],
                transition: !1,
                doc: "The standard parallels of the projection, denoting the desired latitude range with minimal distortion. `parallels` takes the form of [lat0, lat1]. This property is only configurable for conic projections (Albers and Lambert Conformal Conic).",
                example: [29.5, 45.5],
                requires: [{
                    name: ["albers", "lambertConformalConic"]
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "2.6.0"
                    }
                }
            }
        },
        ro = {
            source: {
                type: "string",
                doc: "Name of a source of `raster_dem` type to be used for terrain elevation.",
                required: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "2.0.0",
                        ios: "10.0.0",
                        android: "10.0.0"
                    }
                }
            },
            exaggeration: {
                type: "number",
                "property-type": "data-constant",
                default: 1,
                minimum: 0,
                maximum: 1e3,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                transition: !0,
                doc: "Exaggerates the elevation of the terrain by multiplying the data from the DEM with this value.",
                requires: ["source"],
                "sdk-support": {
                    "basic functionality": {
                        js: "2.0.0",
                        ios: "10.0.0",
                        android: "10.0.0"
                    }
                }
            }
        },
        no = ["paint_fill", "paint_line", "paint_circle", "paint_heatmap", "paint_fill-extrusion", "paint_symbol", "paint_raster", "paint_hillshade", "paint_background", "paint_sky"],
        io = {
            "fill-antialias": {
                type: "boolean",
                default: !0,
                doc: "Whether or not the fill should be antialiased.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "fill-opacity": {
                type: "number",
                default: 1,
                minimum: 0,
                maximum: 1,
                doc: "The opacity of the entire fill layer. In contrast to the `fill-color`, this value will also affect the 1px stroke around the fill, if the stroke is used.",
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.21.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "fill-color": {
                type: "color",
                default: "#000000",
                doc: "The color of the filled part of this layer. This color can be specified as `rgba` with an alpha component and the color's opacity will not affect the opacity of the 1px stroke, if it is used.",
                transition: !0,
                requires: [{
                    "!": "fill-pattern"
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.19.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "fill-outline-color": {
                type: "color",
                doc: "The outline color of the fill. Matches the value of `fill-color` if unspecified.",
                transition: !0,
                requires: [{
                    "!": "fill-pattern"
                }, {
                    "fill-antialias": !0
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.19.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "fill-translate": {
                type: "array",
                value: "number",
                length: 2,
                default: [0, 0],
                transition: !0,
                units: "pixels",
                doc: "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "fill-translate-anchor": {
                type: "enum",
                values: {
                    map: {
                        doc: "The fill is translated relative to the map."
                    },
                    viewport: {
                        doc: "The fill is translated relative to the viewport."
                    }
                },
                doc: "Controls the frame of reference for `fill-translate`.",
                default: "map",
                requires: ["fill-translate"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "fill-pattern": {
                type: "resolvedImage",
                transition: !1,
                doc: "Name of image in sprite to use for drawing image fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.49.0",
                        android: "6.5.0",
                        macos: "0.11.0",
                        ios: "4.4.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            }
        },
        oo = {
            "line-opacity": {
                type: "number",
                doc: "The opacity at which the line will be drawn.",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.29.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "line-color": {
                type: "color",
                doc: "The color with which the line will be drawn.",
                default: "#000000",
                transition: !0,
                requires: [{
                    "!": "line-pattern"
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.23.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "line-translate": {
                type: "array",
                value: "number",
                length: 2,
                default: [0, 0],
                transition: !0,
                units: "pixels",
                doc: "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "line-translate-anchor": {
                type: "enum",
                values: {
                    map: {
                        doc: "The line is translated relative to the map."
                    },
                    viewport: {
                        doc: "The line is translated relative to the viewport."
                    }
                },
                doc: "Controls the frame of reference for `line-translate`.",
                default: "map",
                requires: ["line-translate"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "line-width": {
                type: "number",
                default: 1,
                minimum: 0,
                transition: !0,
                units: "pixels",
                doc: "Stroke thickness.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.39.0",
                        android: "5.2.0",
                        ios: "3.7.0",
                        macos: "0.6.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "line-gap-width": {
                type: "number",
                default: 0,
                minimum: 0,
                doc: "Draws a line casing outside of a line's actual path. Value indicates the width of the inner gap.",
                transition: !0,
                units: "pixels",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.29.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "line-offset": {
                type: "number",
                default: 0,
                doc: "The line's offset. For linear features, a positive value offsets the line to the right, relative to the direction of the line, and a negative value to the left. For polygon features, a positive value results in an inset, and a negative value results in an outset.",
                transition: !0,
                units: "pixels",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.12.1",
                        android: "3.0.0",
                        ios: "3.1.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.29.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "line-blur": {
                type: "number",
                default: 0,
                minimum: 0,
                transition: !0,
                units: "pixels",
                doc: "Blur applied to the line, in pixels.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.29.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "line-dasharray": {
                type: "array",
                value: "number",
                doc: "Specifies the lengths of the alternating dashes and gaps that form the dash pattern. The lengths are later scaled by the line width. To convert a dash length to pixels, multiply the length by the current line width. Note that GeoJSON sources with `lineMetrics: true` specified won't render dashed lines to the expected scale. Also note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
                minimum: 0,
                transition: !1,
                units: "line widths",
                requires: [{
                    "!": "line-pattern"
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "2.3.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "line-pattern": {
                type: "resolvedImage",
                transition: !1,
                doc: "Name of image in sprite to use for drawing image lines. For seamless patterns, image width must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.49.0",
                        android: "6.5.0",
                        macos: "0.11.0",
                        ios: "4.4.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "line-gradient": {
                type: "color",
                doc: 'Defines a gradient with which to color a line feature. Can only be used with GeoJSON sources that specify `"lineMetrics": true`.',
                transition: !1,
                requires: [{
                    "!": "line-pattern"
                }, {
                    source: "geojson",
                    has: {
                        lineMetrics: !0
                    }
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.45.0",
                        android: "6.5.0",
                        ios: "4.4.0",
                        macos: "0.11.0"
                    },
                    "data-driven styling": {}
                },
                expression: {
                    interpolated: !0,
                    parameters: ["line-progress"]
                },
                "property-type": "color-ramp"
            },
            "line-trim-offset": {
                type: "array",
                value: "number",
                doc: "The line part between [trim-start, trim-end] will be marked as transparent to make a route vanishing effect. The line trim-off offset is based on the whole line range [0.0, 1.0].",
                length: 2,
                default: [0, 0],
                minimum: [0, 0],
                maximum: [1, 1],
                transition: !1,
                requires: [{
                    source: "geojson",
                    has: {
                        lineMetrics: !0
                    }
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "2.9.0",
                        android: "10.5.0",
                        ios: "10.5.0",
                        macos: "10.5.0"
                    }
                },
                "property-type": "constant"
            }
        },
        ao = {
            "circle-radius": {
                type: "number",
                default: 5,
                minimum: 0,
                transition: !0,
                units: "pixels",
                doc: "Circle radius.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.18.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "circle-color": {
                type: "color",
                default: "#000000",
                doc: "The fill color of the circle.",
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.18.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "circle-blur": {
                type: "number",
                default: 0,
                doc: "Amount to blur the circle. 1 blurs the circle such that only the centerpoint is full opacity.",
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.20.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "circle-opacity": {
                type: "number",
                doc: "The opacity at which the circle will be drawn.",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.20.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "circle-translate": {
                type: "array",
                value: "number",
                length: 2,
                default: [0, 0],
                transition: !0,
                units: "pixels",
                doc: "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "circle-translate-anchor": {
                type: "enum",
                values: {
                    map: {
                        doc: "The circle is translated relative to the map."
                    },
                    viewport: {
                        doc: "The circle is translated relative to the viewport."
                    }
                },
                doc: "Controls the frame of reference for `circle-translate`.",
                default: "map",
                requires: ["circle-translate"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "circle-pitch-scale": {
                type: "enum",
                values: {
                    map: {
                        doc: "Circles are scaled according to their apparent distance to the camera."
                    },
                    viewport: {
                        doc: "Circles are not scaled."
                    }
                },
                default: "map",
                doc: "Controls the scaling behavior of the circle when the map is pitched.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.21.0",
                        android: "4.2.0",
                        ios: "3.4.0",
                        macos: "0.2.1"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "circle-pitch-alignment": {
                type: "enum",
                values: {
                    map: {
                        doc: "The circle is aligned to the plane of the map."
                    },
                    viewport: {
                        doc: "The circle is aligned to the plane of the viewport."
                    }
                },
                default: "viewport",
                doc: "Orientation of circle when map is pitched.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.39.0",
                        android: "5.2.0",
                        ios: "3.7.0",
                        macos: "0.6.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "circle-stroke-width": {
                type: "number",
                default: 0,
                minimum: 0,
                transition: !0,
                units: "pixels",
                doc: "The width of the circle's stroke. Strokes are placed outside of the `circle-radius`.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.29.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    },
                    "data-driven styling": {
                        js: "0.29.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "circle-stroke-color": {
                type: "color",
                default: "#000000",
                doc: "The stroke color of the circle.",
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.29.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    },
                    "data-driven styling": {
                        js: "0.29.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "circle-stroke-opacity": {
                type: "number",
                doc: "The opacity of the circle's stroke.",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.29.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    },
                    "data-driven styling": {
                        js: "0.29.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            }
        },
        so = {
            "heatmap-radius": {
                type: "number",
                default: 30,
                minimum: 1,
                transition: !0,
                units: "pixels",
                doc: "Radius of influence of one heatmap point in pixels. Increasing the value makes the heatmap smoother, but less detailed. `queryRenderedFeatures` on heatmap layers will return points within this radius.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.41.0",
                        android: "6.0.0",
                        ios: "4.0.0",
                        macos: "0.7.0"
                    },
                    "data-driven styling": {
                        js: "0.43.0",
                        android: "6.0.0",
                        ios: "4.0.0",
                        macos: "0.7.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "heatmap-weight": {
                type: "number",
                default: 1,
                minimum: 0,
                transition: !1,
                doc: "A measure of how much an individual point contributes to the heatmap. A value of 10 would be equivalent to having 10 points of weight 1 in the same spot. Especially useful when combined with clustering.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.41.0",
                        android: "6.0.0",
                        ios: "4.0.0",
                        macos: "0.7.0"
                    },
                    "data-driven styling": {
                        js: "0.41.0",
                        android: "6.0.0",
                        ios: "4.0.0",
                        macos: "0.7.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "heatmap-intensity": {
                type: "number",
                default: 1,
                minimum: 0,
                transition: !0,
                doc: "Similar to `heatmap-weight` but controls the intensity of the heatmap globally. Primarily used for adjusting the heatmap based on zoom level.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.41.0",
                        android: "6.0.0",
                        ios: "4.0.0",
                        macos: "0.7.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "heatmap-color": {
                type: "color",
                default: ["interpolate", ["linear"],
                    ["heatmap-density"], 0, "rgba(0, 0, 255, 0)", .1, "royalblue", .3, "cyan", .5, "lime", .7, "yellow", 1, "red"
                ],
                doc: 'Defines the color of each pixel based on its density value in a heatmap.  Should be an expression that uses `["heatmap-density"]` as input.',
                transition: !1,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.41.0",
                        android: "6.0.0",
                        ios: "4.0.0",
                        macos: "0.7.0"
                    },
                    "data-driven styling": {}
                },
                expression: {
                    interpolated: !0,
                    parameters: ["heatmap-density"]
                },
                "property-type": "color-ramp"
            },
            "heatmap-opacity": {
                type: "number",
                doc: "The global opacity at which the heatmap layer will be drawn.",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.41.0",
                        android: "6.0.0",
                        ios: "4.0.0",
                        macos: "0.7.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            }
        },
        lo = {
            "icon-opacity": {
                doc: "The opacity at which the icon will be drawn.",
                type: "number",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                requires: ["icon-image"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.33.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "icon-color": {
                type: "color",
                default: "#000000",
                transition: !0,
                doc: "The color of the icon. This can only be used with [SDF icons](/help/troubleshooting/using-recolorable-images-in-mapbox-maps/).",
                requires: ["icon-image"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.33.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "icon-halo-color": {
                type: "color",
                default: "rgba(0, 0, 0, 0)",
                transition: !0,
                doc: "The color of the icon's halo. Icon halos can only be used with [SDF icons](/help/troubleshooting/using-recolorable-images-in-mapbox-maps/).",
                requires: ["icon-image"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.33.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "icon-halo-width": {
                type: "number",
                default: 0,
                minimum: 0,
                transition: !0,
                units: "pixels",
                doc: "Distance of halo to the icon outline.",
                requires: ["icon-image"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.33.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "icon-halo-blur": {
                type: "number",
                default: 0,
                minimum: 0,
                transition: !0,
                units: "pixels",
                doc: "Fade out the halo towards the outside.",
                requires: ["icon-image"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.33.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "icon-translate": {
                type: "array",
                value: "number",
                length: 2,
                default: [0, 0],
                transition: !0,
                units: "pixels",
                doc: "Distance that the icon's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.",
                requires: ["icon-image"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-translate-anchor": {
                type: "enum",
                values: {
                    map: {
                        doc: "Icons are translated relative to the map."
                    },
                    viewport: {
                        doc: "Icons are translated relative to the viewport."
                    }
                },
                doc: "Controls the frame of reference for `icon-translate`.",
                default: "map",
                requires: ["icon-image", "icon-translate"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-opacity": {
                type: "number",
                doc: "The opacity at which the text will be drawn.",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.33.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "text-color": {
                type: "color",
                doc: "The color with which the text will be drawn.",
                default: "#000000",
                transition: !0,
                overridable: !0,
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.33.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "text-halo-color": {
                type: "color",
                default: "rgba(0, 0, 0, 0)",
                transition: !0,
                doc: "The color of the text's halo, which helps it stand out from backgrounds.",
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.33.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "text-halo-width": {
                type: "number",
                default: 0,
                minimum: 0,
                transition: !0,
                units: "pixels",
                doc: "Distance of halo to the font outline. Max text halo width is 1/4 of the font-size.",
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.33.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "text-halo-blur": {
                type: "number",
                default: 0,
                minimum: 0,
                transition: !0,
                units: "pixels",
                doc: "The halo's fadeout distance towards the outside.",
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    },
                    "data-driven styling": {
                        js: "0.33.0",
                        android: "5.0.0",
                        ios: "3.5.0",
                        macos: "0.4.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "text-translate": {
                type: "array",
                value: "number",
                length: 2,
                default: [0, 0],
                transition: !0,
                units: "pixels",
                doc: "Distance that the text's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.",
                requires: ["text-field"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-translate-anchor": {
                type: "enum",
                values: {
                    map: {
                        doc: "The text is translated relative to the map."
                    },
                    viewport: {
                        doc: "The text is translated relative to the viewport."
                    }
                },
                doc: "Controls the frame of reference for `text-translate`.",
                default: "map",
                requires: ["text-field", "text-translate"],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            }
        },
        uo = {
            "raster-opacity": {
                type: "number",
                doc: "The opacity at which the image will be drawn.",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "raster-hue-rotate": {
                type: "number",
                default: 0,
                period: 360,
                transition: !0,
                units: "degrees",
                doc: "Rotates hues around the color wheel.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "raster-brightness-min": {
                type: "number",
                doc: "Increase or reduce the brightness of the image. The value is the minimum brightness.",
                default: 0,
                minimum: 0,
                maximum: 1,
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "raster-brightness-max": {
                type: "number",
                doc: "Increase or reduce the brightness of the image. The value is the maximum brightness.",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "raster-saturation": {
                type: "number",
                doc: "Increase or reduce the saturation of the image.",
                default: 0,
                minimum: -1,
                maximum: 1,
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "raster-contrast": {
                type: "number",
                doc: "Increase or reduce the contrast of the image.",
                default: 0,
                minimum: -1,
                maximum: 1,
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "raster-resampling": {
                type: "enum",
                doc: "The resampling/interpolation method to use for overscaling, also known as texture magnification filter",
                values: {
                    linear: {
                        doc: "(Bi)linear filtering interpolates pixel values using the weighted average of the four closest original source pixels creating a smooth but blurry look when overscaled"
                    },
                    nearest: {
                        doc: "Nearest neighbor filtering interpolates pixel values using the nearest original source pixel creating a sharp but pixelated look when overscaled"
                    }
                },
                default: "linear",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.47.0",
                        android: "6.3.0",
                        ios: "4.2.0",
                        macos: "0.9.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "raster-fade-duration": {
                type: "number",
                default: 300,
                minimum: 0,
                transition: !1,
                units: "milliseconds",
                doc: "Fade duration when a new tile is added.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            }
        },
        co = {
            "hillshade-illumination-direction": {
                type: "number",
                default: 335,
                minimum: 0,
                maximum: 359,
                doc: "The direction of the light source used to generate the hillshading with 0 as the top of the viewport if `hillshade-illumination-anchor` is set to `viewport` and due north if `hillshade-illumination-anchor` is set to `map`.",
                transition: !1,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.43.0",
                        android: "6.0.0",
                        ios: "4.0.0",
                        macos: "0.7.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "hillshade-illumination-anchor": {
                type: "enum",
                values: {
                    map: {
                        doc: "The hillshade illumination is relative to the north direction."
                    },
                    viewport: {
                        doc: "The hillshade illumination is relative to the top of the viewport."
                    }
                },
                default: "viewport",
                doc: "Direction of light source when map is rotated.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.43.0",
                        android: "6.0.0",
                        ios: "4.0.0",
                        macos: "0.7.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "hillshade-exaggeration": {
                type: "number",
                doc: "Intensity of the hillshade",
                default: .5,
                minimum: 0,
                maximum: 1,
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.43.0",
                        android: "6.0.0",
                        ios: "4.0.0",
                        macos: "0.7.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "hillshade-shadow-color": {
                type: "color",
                default: "#000000",
                doc: "The shading color of areas that face away from the light source.",
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.43.0",
                        android: "6.0.0",
                        ios: "4.0.0",
                        macos: "0.7.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "hillshade-highlight-color": {
                type: "color",
                default: "#FFFFFF",
                doc: "The shading color of areas that faces towards the light source.",
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.43.0",
                        android: "6.0.0",
                        ios: "4.0.0",
                        macos: "0.7.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "hillshade-accent-color": {
                type: "color",
                default: "#000000",
                doc: "The shading color used to accentuate rugged terrain like sharp cliffs and gorges.",
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.43.0",
                        android: "6.0.0",
                        ios: "4.0.0",
                        macos: "0.7.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            }
        },
        po = {
            "background-color": {
                type: "color",
                default: "#000000",
                doc: "The color with which the background will be drawn.",
                transition: !0,
                requires: [{
                    "!": "background-pattern"
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "background-pattern": {
                type: "resolvedImage",
                transition: !1,
                doc: "Name of image in sprite to use for drawing an image background. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "background-opacity": {
                type: "number",
                default: 1,
                minimum: 0,
                maximum: 1,
                doc: "The opacity at which the background will be drawn.",
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "0.10.0",
                        android: "2.0.1",
                        ios: "2.0.0",
                        macos: "0.1.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            }
        },
        ho = {
            "sky-type": {
                type: "enum",
                values: {
                    gradient: {
                        doc: "Renders the sky with a gradient that can be configured with `sky-gradient-radius` and `sky-gradient`."
                    },
                    atmosphere: {
                        doc: "Renders the sky with a simulated atmospheric scattering algorithm, the sun direction can be attached to the light position or explicitly set through `sky-atmosphere-sun`."
                    }
                },
                default: "atmosphere",
                doc: "The type of the sky",
                "sdk-support": {
                    "basic functionality": {
                        js: "2.0.0",
                        ios: "10.0.0",
                        android: "10.0.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "sky-atmosphere-sun": {
                type: "array",
                value: "number",
                length: 2,
                units: "degrees",
                minimum: [0, 0],
                maximum: [360, 180],
                transition: !1,
                doc: "Position of the sun center [a azimuthal angle, p polar angle]. The azimuthal angle indicates the position of the sun relative to 0° north, where degrees proceed clockwise. The polar angle indicates the height of the sun, where 0° is directly above, at zenith, and 90° at the horizon. When this property is ommitted, the sun center is directly inherited from the light position.",
                "sdk-support": {
                    "basic functionality": {
                        js: "2.0.0",
                        ios: "10.0.0",
                        android: "10.0.0"
                    }
                },
                requires: [{
                    "sky-type": "atmosphere"
                }],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "sky-atmosphere-sun-intensity": {
                type: "number",
                requires: [{
                    "sky-type": "atmosphere"
                }],
                default: 10,
                minimum: 0,
                maximum: 100,
                transition: !1,
                doc: "Intensity of the sun as a light source in the atmosphere (on a scale from 0 to a 100). Setting higher values will brighten up the sky.",
                "sdk-support": {
                    "basic functionality": {
                        js: "2.0.0",
                        ios: "10.0.0",
                        android: "10.0.0"
                    }
                },
                "property-type": "data-constant"
            },
            "sky-gradient-center": {
                type: "array",
                requires: [{
                    "sky-type": "gradient"
                }],
                value: "number",
                default: [0, 0],
                length: 2,
                units: "degrees",
                minimum: [0, 0],
                maximum: [360, 180],
                transition: !1,
                doc: "Position of the gradient center [a azimuthal angle, p polar angle]. The azimuthal angle indicates the position of the gradient center relative to 0° north, where degrees proceed clockwise. The polar angle indicates the height of the gradient center, where 0° is directly above, at zenith, and 90° at the horizon.",
                "sdk-support": {
                    "basic functionality": {
                        js: "2.0.0",
                        ios: "10.0.0",
                        android: "10.0.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "sky-gradient-radius": {
                type: "number",
                requires: [{
                    "sky-type": "gradient"
                }],
                default: 90,
                minimum: 0,
                maximum: 180,
                transition: !1,
                doc: "The angular distance (measured in degrees) from `sky-gradient-center` up to which the gradient extends. A value of 180 causes the gradient to wrap around to the opposite direction from `sky-gradient-center`.",
                "sdk-support": {
                    "basic functionality": {
                        js: "2.0.0",
                        ios: "10.0.0",
                        android: "10.0.0"
                    }
                },
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "sky-gradient": {
                type: "color",
                default: ["interpolate", ["linear"],
                    ["sky-radial-progress"], .8, "#87ceeb", 1, "white"
                ],
                doc: "Defines a radial color gradient with which to color the sky. The color values can be interpolated with an expression using `sky-radial-progress`. The range [0, 1] for the interpolant covers a radial distance (in degrees) of [0, `sky-gradient-radius`] centered at the position specified by `sky-gradient-center`.",
                transition: !1,
                requires: [{
                    "sky-type": "gradient"
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "2.0.0",
                        ios: "10.0.0",
                        android: "10.0.0"
                    },
                    "data-driven styling": {}
                },
                expression: {
                    interpolated: !0,
                    parameters: ["sky-radial-progress"]
                },
                "property-type": "color-ramp"
            },
            "sky-atmosphere-halo-color": {
                type: "color",
                default: "white",
                doc: "A color applied to the atmosphere sun halo. The alpha channel describes how strongly the sun halo is represented in an atmosphere sky layer.",
                transition: !1,
                requires: [{
                    "sky-type": "atmosphere"
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "2.0.0",
                        ios: "10.0.0",
                        android: "10.0.0"
                    }
                },
                "property-type": "data-constant"
            },
            "sky-atmosphere-color": {
                type: "color",
                default: "white",
                doc: "A color used to tweak the main atmospheric scattering coefficients. Using white applies the default coefficients giving the natural blue color to the atmosphere. This color affects how heavily the corresponding wavelength is represented during scattering. The alpha channel describes the density of the atmosphere, with 1 maximum density and 0 no density.",
                transition: !1,
                requires: [{
                    "sky-type": "atmosphere"
                }],
                "sdk-support": {
                    "basic functionality": {
                        js: "2.0.0",
                        ios: "10.0.0",
                        android: "10.0.0"
                    }
                },
                "property-type": "data-constant"
            },
            "sky-opacity": {
                type: "number",
                default: 1,
                minimum: 0,
                maximum: 1,
                doc: "The opacity of the entire sky layer.",
                transition: !0,
                "sdk-support": {
                    "basic functionality": {
                        js: "2.0.0",
                        ios: "10.0.0",
                        android: "10.0.0"
                    }
                },
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            }
        },
        fo = {
            duration: {
                type: "number",
                default: 300,
                minimum: 0,
                units: "milliseconds",
                doc: "Time allotted for transitions to complete."
            },
            delay: {
                type: "number",
                default: 0,
                minimum: 0,
                units: "milliseconds",
                doc: "Length of time before a transition begins."
            }
        },
        mo = {
            "*": {
                type: "string",
                doc: "A name of a feature property to use as ID for feature state."
            }
        },
        yo = {
            $version: te,
            $root: Te,
            sources: ji,
            source: Ti,
            source_vector: zi,
            source_raster: Ci,
            source_raster_dem: Ei,
            source_geojson: Ai,
            source_video: _i,
            source_image: Si,
            layer: Ii,
            layout: Ri,
            layout_background: Oi,
            layout_sky: qi,
            layout_fill: Li,
            layout_circle: Ni,
            layout_heatmap: Di,
            "layout_fill-extrusion": {
                visibility: {
                    type: "enum",
                    values: {
                        visible: {
                            doc: "The layer is shown."
                        },
                        none: {
                            doc: "The layer is not shown."
                        }
                    },
                    default: "visible",
                    doc: "Whether this layer is displayed.",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.27.0",
                            android: "5.1.0",
                            ios: "3.6.0",
                            macos: "0.5.0"
                        }
                    },
                    "property-type": "constant"
                },
                "fill-extrusion-edge-radius": {
                    type: "number",
                    private: !0,
                    default: 0,
                    minimum: 0,
                    maximum: 1,
                    doc: "Radius of a fill extrusion edge in meters. If not zero, rounds extrusion edges for a smoother appearance.",
                    "sdk-support": {
                        "basic functionality": {
                            js: "v2.10.0",
                            android: "10.7.0",
                            ios: "10.7.0"
                        }
                    },
                    "property-type": "constant"
                }
            },
            layout_line: Pi,
            layout_symbol: Mi,
            layout_raster: $i,
            layout_hillshade: Fi,
            filter: Ui,
            filter_symbol: Bi,
            filter_fill: Wi,
            filter_line: Ji,
            filter_circle: Vi,
            "filter_fill-extrusion": {
                type: "boolean",
                doc: 'Expression which determines whether or not to display a Polygon. Fill-extrusion layer does NOT support dynamic filtering, meaning this expression can NOT use the `["pitch"]` and `["distance-from-center"]` expressions to reference the current state of the view.',
                default: !1,
                transition: !1,
                "property-type": "data-driven",
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                }
            },
            filter_heatmap: Hi,
            filter_operator: Gi,
            geometry_type: Zi,
            function: {
                expression: {
                    type: "expression",
                    doc: "An expression."
                },
                stops: {
                    type: "array",
                    doc: "An array of stops.",
                    value: "function_stop"
                },
                base: {
                    type: "number",
                    default: 1,
                    minimum: 0,
                    doc: "The exponential base of the interpolation curve. It controls the rate at which the result increases. Higher values make the result increase more towards the high end of the range. With `1` the stops are interpolated linearly."
                },
                property: {
                    type: "string",
                    doc: "The name of a feature property to use as the function input.",
                    default: "$zoom"
                },
                type: {
                    type: "enum",
                    values: {
                        identity: {
                            doc: "Return the input value as the output value."
                        },
                        exponential: {
                            doc: "Generate an output by interpolating between stops just less than and just greater than the function input."
                        },
                        interval: {
                            doc: "Return the output value of the stop just less than the function input."
                        },
                        categorical: {
                            doc: "Return the output value of the stop equal to the function input."
                        }
                    },
                    doc: "The interpolation strategy to use in function evaluation.",
                    default: "exponential"
                },
                colorSpace: {
                    type: "enum",
                    values: {
                        rgb: {
                            doc: "Use the RGB color space to interpolate color values"
                        },
                        lab: {
                            doc: "Use the LAB color space to interpolate color values."
                        },
                        hcl: {
                            doc: "Use the HCL color space to interpolate color values, interpolating the Hue, Chroma, and Luminance channels individually."
                        }
                    },
                    doc: "The color space in which colors interpolated. Interpolating colors in perceptual color spaces like LAB and HCL tend to produce color ramps that look more consistent and produce colors that can be differentiated more easily than those interpolated in RGB space.",
                    default: "rgb"
                },
                default: {
                    type: "*",
                    required: !1,
                    doc: `A value to serve as a fallback function result when a value isn't otherwise available. It is used in the following circumstances:
* In categorical functions, when the feature value does not match any of the stop domain values.
* In property and zoom-and-property functions, when a feature does not contain a value for the specified property.
* In identity functions, when the feature value is not valid for the style property (for example, if the function is being used for a \`circle-color\` property but the feature property value is not a string or not a valid color).
* In interval or exponential property and zoom-and-property functions, when the feature value is not numeric.
If no default is provided, the style property's default is used in these circumstances.`
                }
            },
            function_stop: Xi,
            expression: Yi,
            expression_name: Ki,
            fog: Qi,
            light: eo,
            projection: to,
            terrain: ro,
            paint: no,
            paint_fill: io,
            "paint_fill-extrusion": {
                "fill-extrusion-opacity": {
                    type: "number",
                    default: 1,
                    minimum: 0,
                    maximum: 1,
                    doc: "The opacity of the entire fill extrusion layer. This is rendered on a per-layer, not per-feature, basis, and data-driven styling is not available.",
                    transition: !0,
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.27.0",
                            android: "5.1.0",
                            ios: "3.6.0",
                            macos: "0.5.0"
                        }
                    },
                    expression: {
                        interpolated: !0,
                        parameters: ["zoom"]
                    },
                    "property-type": "data-constant"
                },
                "fill-extrusion-color": {
                    type: "color",
                    default: "#000000",
                    doc: "The base color of the extruded fill. The extrusion's surfaces will be shaded differently based on this color in combination with the root `light` settings. If this color is specified as `rgba` with an alpha component, the alpha component will be ignored; use `fill-extrusion-opacity` to set layer opacity.",
                    transition: !0,
                    requires: [{
                        "!": "fill-extrusion-pattern"
                    }],
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.27.0",
                            android: "5.1.0",
                            ios: "3.6.0",
                            macos: "0.5.0"
                        },
                        "data-driven styling": {
                            js: "0.27.0",
                            android: "5.1.0",
                            ios: "3.6.0",
                            macos: "0.5.0"
                        }
                    },
                    expression: {
                        interpolated: !0,
                        parameters: ["zoom", "feature", "feature-state"]
                    },
                    "property-type": "data-driven"
                },
                "fill-extrusion-translate": {
                    type: "array",
                    value: "number",
                    length: 2,
                    default: [0, 0],
                    transition: !0,
                    units: "pixels",
                    doc: "The geometry's offset. Values are [x, y] where negatives indicate left and up (on the flat plane), respectively.",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.27.0",
                            android: "5.1.0",
                            ios: "3.6.0",
                            macos: "0.5.0"
                        }
                    },
                    expression: {
                        interpolated: !0,
                        parameters: ["zoom"]
                    },
                    "property-type": "data-constant"
                },
                "fill-extrusion-translate-anchor": {
                    type: "enum",
                    values: {
                        map: {
                            doc: "The fill extrusion is translated relative to the map."
                        },
                        viewport: {
                            doc: "The fill extrusion is translated relative to the viewport."
                        }
                    },
                    doc: "Controls the frame of reference for `fill-extrusion-translate`.",
                    default: "map",
                    requires: ["fill-extrusion-translate"],
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.27.0",
                            android: "5.1.0",
                            ios: "3.6.0",
                            macos: "0.5.0"
                        }
                    },
                    expression: {
                        interpolated: !1,
                        parameters: ["zoom"]
                    },
                    "property-type": "data-constant"
                },
                "fill-extrusion-pattern": {
                    type: "resolvedImage",
                    transition: !1,
                    doc: "Name of image in sprite to use for drawing images on extruded fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.27.0",
                            android: "5.1.0",
                            ios: "3.6.0",
                            macos: "0.5.0"
                        },
                        "data-driven styling": {
                            js: "0.49.0",
                            android: "6.5.0",
                            macos: "0.11.0",
                            ios: "4.4.0"
                        }
                    },
                    expression: {
                        interpolated: !1,
                        parameters: ["zoom", "feature"]
                    },
                    "property-type": "data-driven"
                },
                "fill-extrusion-height": {
                    type: "number",
                    default: 0,
                    minimum: 0,
                    units: "meters",
                    doc: "The height with which to extrude this layer.",
                    transition: !0,
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.27.0",
                            android: "5.1.0",
                            ios: "3.6.0",
                            macos: "0.5.0"
                        },
                        "data-driven styling": {
                            js: "0.27.0",
                            android: "5.1.0",
                            ios: "3.6.0",
                            macos: "0.5.0"
                        }
                    },
                    expression: {
                        interpolated: !0,
                        parameters: ["zoom", "feature", "feature-state"]
                    },
                    "property-type": "data-driven"
                },
                "fill-extrusion-base": {
                    type: "number",
                    default: 0,
                    minimum: 0,
                    units: "meters",
                    doc: "The height with which to extrude the base of this layer. Must be less than or equal to `fill-extrusion-height`.",
                    transition: !0,
                    requires: ["fill-extrusion-height"],
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.27.0",
                            android: "5.1.0",
                            ios: "3.6.0",
                            macos: "0.5.0"
                        },
                        "data-driven styling": {
                            js: "0.27.0",
                            android: "5.1.0",
                            ios: "3.6.0",
                            macos: "0.5.0"
                        }
                    },
                    expression: {
                        interpolated: !0,
                        parameters: ["zoom", "feature", "feature-state"]
                    },
                    "property-type": "data-driven"
                },
                "fill-extrusion-vertical-gradient": {
                    type: "boolean",
                    default: !0,
                    doc: "Whether to apply a vertical gradient to the sides of a fill-extrusion layer. If true, sides will be shaded slightly darker farther down.",
                    transition: !1,
                    "sdk-support": {
                        "basic functionality": {
                            js: "0.50.0",
                            android: "7.0.0",
                            ios: "4.7.0",
                            macos: "0.13.0"
                        }
                    },
                    expression: {
                        interpolated: !1,
                        parameters: ["zoom"]
                    },
                    "property-type": "data-constant"
                },
                "fill-extrusion-ambient-occlusion-intensity": {
                    "property-type": "data-constant",
                    type: "number",
                    private: !0,
                    default: 0,
                    minimum: 0,
                    maximum: 1,
                    expression: {
                        interpolated: !0,
                        parameters: ["zoom"]
                    },
                    transition: !0,
                    doc: "Controls the intensity of shading near ground and concave angles between walls. Default value 0.0 disables ambient occlusion and values around 0.3 provide the most plausible results for buildings.",
                    "sdk-support": {
                        "basic functionality": {
                            js: "2.10.0",
                            android: "10.7.0",
                            ios: "10.7.0"
                        }
                    }
                },
                "fill-extrusion-ambient-occlusion-radius": {
                    "property-type": "data-constant",
                    type: "number",
                    private: !0,
                    default: 3,
                    minimum: 0,
                    expression: {
                        interpolated: !0,
                        parameters: ["zoom"]
                    },
                    transition: !0,
                    doc: "Shades area near ground and concave angles between walls where the radius defines only vertical impact. Default value 3.0 corresponds to height of one floor and brings the most plausible results for buildings.",
                    requires: ["fill-extrusion-edge-radius"],
                    "sdk-support": {
                        "basic functionality": {
                            js: "2.10.0",
                            android: "10.7.0",
                            ios: "10.7.0"
                        }
                    }
                }
            },
            paint_line: oo,
            paint_circle: ao,
            paint_heatmap: so,
            paint_symbol: lo,
            paint_raster: uo,
            paint_hillshade: co,
            paint_background: po,
            paint_sky: ho,
            transition: fo,
            "property-type": {
                "data-driven": {
                    type: "property-type",
                    doc: "Property is interpolable and can be represented using a property expression."
                },
                "color-ramp": {
                    type: "property-type",
                    doc: "Property should be specified using a color ramp from which the output color can be sampled based on a property calculation."
                },
                "data-constant": {
                    type: "property-type",
                    doc: "Property is interpolable but cannot be represented using a property expression."
                },
                constant: {
                    type: "property-type",
                    doc: "Property is constant across all zoom levels and property values."
                }
            },
            promoteId: mo
        },
        zt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {},
        Ct = {
            exports: {}
        }; /*! https://mths.be/punycode v1.3.2 by @mathias */
    (function(r, e) {
        (function(t) {
            var n = e && !e.nodeType && e,
                i = r && !r.nodeType && r,
                o = typeof zt == "object" && zt;
            (o.global === o || o.window === o || o.self === o) && (t = o);
            var a, s = 2147483647,
                l = 36,
                u = 1,
                c = 26,
                p = 38,
                d = 700,
                m = 72,
                v = 128,
                _ = "-",
                j = /^xn--/,
                g = /[^\x20-\x7E]/,
                f = /[\x2E\u3002\uFF0E\uFF61]/g,
                b = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input"
                },
                T = l - u,
                h = Math.floor,
                k = String.fromCharCode,
                Q;

            function A(w) {
                throw RangeError(b[w])
            }

            function M(w, x) {
                for (var S = w.length, R = []; S--;) R[S] = x(w[S]);
                return R
            }

            function ee(w, x) {
                var S = w.split("@"),
                    R = "";
                S.length > 1 && (R = S[0] + "@", w = S[1]), w = w.replace(f, ".");
                var O = w.split("."),
                    q = M(O, x).join(".");
                return R + q
            }

            function ie(w) {
                for (var x = [], S = 0, R = w.length, O, q; S < R;) O = w.charCodeAt(S++), O >= 55296 && O <= 56319 && S < R ? (q = w.charCodeAt(S++), (q & 64512) == 56320 ? x.push(((O & 1023) << 10) + (q & 1023) + 65536) : (x.push(O), S--)) : x.push(O);
                return x
            }

            function F(w) {
                return M(w, function(x) {
                    var S = "";
                    return x > 65535 && (x -= 65536, S += k(x >>> 10 & 1023 | 55296), x = 56320 | x & 1023), S += k(x), S
                }).join("")
            }

            function I(w) {
                return w - 48 < 10 ? w - 22 : w - 65 < 26 ? w - 65 : w - 97 < 26 ? w - 97 : l
            }

            function N(w, x) {
                return w + 22 + 75 * (w < 26) - ((x != 0) << 5)
            }

            function se(w, x, S) {
                var R = 0;
                for (w = S ? h(w / d) : w >> 1, w += h(w / x); w > T * c >> 1; R += l) w = h(w / T);
                return h(R + (T + 1) * w / (w + p))
            }

            function Z(w) {
                var x = [],
                    S = w.length,
                    R, O = 0,
                    q = v,
                    D = m,
                    U, X, V, we, G, le, pe, je, Ee;
                for (U = w.lastIndexOf(_), U < 0 && (U = 0), X = 0; X < U; ++X) w.charCodeAt(X) >= 128 && A("not-basic"), x.push(w.charCodeAt(X));
                for (V = U > 0 ? U + 1 : 0; V < S;) {
                    for (we = O, G = 1, le = l; V >= S && A("invalid-input"), pe = I(w.charCodeAt(V++)), (pe >= l || pe > h((s - O) / G)) && A("overflow"), O += pe * G, je = le <= D ? u : le >= D + c ? c : le - D, !(pe < je); le += l) Ee = l - je, G > h(s / Ee) && A("overflow"), G *= Ee;
                    R = x.length + 1, D = se(O - we, R, we == 0), h(O / R) > s - q && A("overflow"), q += h(O / R), O %= R, x.splice(O++, 0, q)
                }
                return F(x)
            }

            function Ue(w) {
                var x, S, R, O, q, D, U, X, V, we, G, le = [],
                    pe, je, Ee, Jr;
                for (w = ie(w), pe = w.length, x = v, S = 0, q = m, D = 0; D < pe; ++D) G = w[D], G < 128 && le.push(k(G));
                for (R = O = le.length, O && le.push(_); R < pe;) {
                    for (U = s, D = 0; D < pe; ++D) G = w[D], G >= x && G < U && (U = G);
                    for (je = R + 1, U - x > h((s - S) / je) && A("overflow"), S += (U - x) * je, x = U, D = 0; D < pe; ++D)
                        if (G = w[D], G < x && ++S > s && A("overflow"), G == x) {
                            for (X = S, V = l; we = V <= q ? u : V >= q + c ? c : V - q, !(X < we); V += l) Jr = X - we, Ee = l - we, le.push(k(N(we + Jr % Ee, 0))), X = h(Jr / Ee);
                            le.push(k(N(X, 0))), q = se(S, je, R == O), S = 0, ++R
                        }++ S, ++x
                }
                return le.join("")
            }

            function Wr(w) {
                return ee(w, function(x) {
                    return j.test(x) ? Z(x.slice(4).toLowerCase()) : x
                })
            }

            function H(w) {
                return ee(w, function(x) {
                    return g.test(x) ? "xn--" + Ue(x) : x
                })
            }
            if (a = {
                    version: "1.3.2",
                    ucs2: {
                        decode: ie,
                        encode: F
                    },
                    decode: Z,
                    encode: Ue,
                    toASCII: H,
                    toUnicode: Wr
                }, n && i)
                if (r.exports == n) i.exports = a;
                else
                    for (Q in a) a.hasOwnProperty(Q) && (n[Q] = a[Q]);
            else t.punycode = a
        })(zt)
    })(Ct, Ct.exports);
    var go = {
            isString: function(r) {
                return typeof r == "string"
            },
            isObject: function(r) {
                return typeof r == "object" && r !== null
            },
            isNull: function(r) {
                return r === null
            },
            isNullOrUndefined: function(r) {
                return r == null
            }
        },
        Be = {};

    function bo(r, e) {
        return Object.prototype.hasOwnProperty.call(r, e)
    }
    var vo = function(r, e, t, n) {
            e = e || "&", t = t || "=";
            var i = {};
            if (typeof r != "string" || r.length === 0) return i;
            var o = /\+/g;
            r = r.split(e);
            var a = 1e3;
            n && typeof n.maxKeys == "number" && (a = n.maxKeys);
            var s = r.length;
            a > 0 && s > a && (s = a);
            for (var l = 0; l < s; ++l) {
                var u = r[l].replace(o, "%20"),
                    c = u.indexOf(t),
                    p, d, m, v;
                c >= 0 ? (p = u.substr(0, c), d = u.substr(c + 1)) : (p = u, d = ""), m = decodeURIComponent(p), v = decodeURIComponent(d), bo(i, m) ? Array.isArray(i[m]) ? i[m].push(v) : i[m] = [i[m], v] : i[m] = v
            }
            return i
        },
        We = function(r) {
            switch (typeof r) {
                case "string":
                    return r;
                case "boolean":
                    return r ? "true" : "false";
                case "number":
                    return isFinite(r) ? r : "";
                default:
                    return ""
            }
        },
        wo = function(r, e, t, n) {
            return e = e || "&", t = t || "=", r === null && (r = void 0), typeof r == "object" ? Object.keys(r).map(function(i) {
                var o = encodeURIComponent(We(i)) + t;
                return Array.isArray(r[i]) ? r[i].map(function(a) {
                    return o + encodeURIComponent(We(a))
                }).join(e) : o + encodeURIComponent(We(r[i]))
            }).join(e) : n ? encodeURIComponent(We(n)) + t + encodeURIComponent(We(r)) : ""
        };
    Be.decode = Be.parse = vo, Be.encode = Be.stringify = wo;
    var xo = Ct.exports,
        fe = go;

    function me() {
        this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
    }
    var ko = /^([a-z0-9.+-]+:)/i,
        jo = /:[0-9]*$/,
        To = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
        zo = ["<", ">", '"', "`", " ", "\r", `
`, "	"],
        Co = ["{", "}", "|", "\\", "^", "`"].concat(zo),
        Et = ["'"].concat(Co),
        Vr = ["%", "/", "?", ";", "#"].concat(Et),
        Hr = ["/", "?", "#"],
        Eo = 255,
        Gr = /^[+a-z0-9A-Z_-]{0,63}$/,
        Ao = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
        _o = {
            javascript: !0,
            "javascript:": !0
        },
        At = {
            javascript: !0,
            "javascript:": !0
        },
        Ae = {
            http: !0,
            https: !0,
            ftp: !0,
            gopher: !0,
            file: !0,
            "http:": !0,
            "https:": !0,
            "ftp:": !0,
            "gopher:": !0,
            "file:": !0
        },
        _t = Be;

    function So(r, e, t) {
        if (r && fe.isObject(r) && r instanceof me) return r;
        var n = new me;
        return n.parse(r, e, t), n
    }
    me.prototype.parse = function(r, e, t) {
        if (!fe.isString(r)) throw new TypeError("Parameter 'url' must be a string, not " + typeof r);
        var n = r.indexOf("?"),
            i = n !== -1 && n < r.indexOf("#") ? "?" : "#",
            o = r.split(i),
            a = /\\/g;
        o[0] = o[0].replace(a, "/"), r = o.join(i);
        var s = r;
        if (s = s.trim(), !t && r.split("#").length === 1) {
            var l = To.exec(s);
            if (l) return this.path = s, this.href = s, this.pathname = l[1], l[2] ? (this.search = l[2], e ? this.query = _t.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : e && (this.search = "", this.query = {}), this
        }
        var u = ko.exec(s);
        if (u) {
            u = u[0];
            var c = u.toLowerCase();
            this.protocol = c, s = s.substr(u.length)
        }
        if (t || u || s.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var p = s.substr(0, 2) === "//";
            p && !(u && At[u]) && (s = s.substr(2), this.slashes = !0)
        }
        if (!At[u] && (p || u && !Ae[u])) {
            for (var d = -1, m = 0; m < Hr.length; m++) {
                var v = s.indexOf(Hr[m]);
                v !== -1 && (d === -1 || v < d) && (d = v)
            }
            var _, j;
            d === -1 ? j = s.lastIndexOf("@") : j = s.lastIndexOf("@", d), j !== -1 && (_ = s.slice(0, j), s = s.slice(j + 1), this.auth = decodeURIComponent(_)), d = -1;
            for (var m = 0; m < Vr.length; m++) {
                var v = s.indexOf(Vr[m]);
                v !== -1 && (d === -1 || v < d) && (d = v)
            }
            d === -1 && (d = s.length), this.host = s.slice(0, d), s = s.slice(d), this.parseHost(), this.hostname = this.hostname || "";
            var g = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
            if (!g)
                for (var f = this.hostname.split(/\./), m = 0, b = f.length; m < b; m++) {
                    var T = f[m];
                    if (T && !T.match(Gr)) {
                        for (var h = "", k = 0, Q = T.length; k < Q; k++) T.charCodeAt(k) > 127 ? h += "x" : h += T[k];
                        if (!h.match(Gr)) {
                            var A = f.slice(0, m),
                                M = f.slice(m + 1),
                                ee = T.match(Ao);
                            ee && (A.push(ee[1]), M.unshift(ee[2])), M.length && (s = "/" + M.join(".") + s), this.hostname = A.join(".");
                            break
                        }
                    }
                }
            this.hostname.length > Eo ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), g || (this.hostname = xo.toASCII(this.hostname));
            var ie = this.port ? ":" + this.port : "",
                F = this.hostname || "";
            this.host = F + ie, this.href += this.host, g && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), s[0] !== "/" && (s = "/" + s))
        }
        if (!_o[c])
            for (var m = 0, b = Et.length; m < b; m++) {
                var I = Et[m];
                if (s.indexOf(I) !== -1) {
                    var N = encodeURIComponent(I);
                    N === I && (N = escape(I)), s = s.split(I).join(N)
                }
            }
        var se = s.indexOf("#");
        se !== -1 && (this.hash = s.substr(se), s = s.slice(0, se));
        var Z = s.indexOf("?");
        if (Z !== -1 ? (this.search = s.substr(Z), this.query = s.substr(Z + 1), e && (this.query = _t.parse(this.query)), s = s.slice(0, Z)) : e && (this.search = "", this.query = {}), s && (this.pathname = s), Ae[c] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
            var ie = this.pathname || "",
                Ue = this.search || "";
            this.path = ie + Ue
        }
        return this.href = this.format(), this
    }, me.prototype.format = function() {
        var r = this.auth || "";
        r && (r = encodeURIComponent(r), r = r.replace(/%3A/i, ":"), r += "@");
        var e = this.protocol || "",
            t = this.pathname || "",
            n = this.hash || "",
            i = !1,
            o = "";
        this.host ? i = r + this.host : this.hostname && (i = r + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (i += ":" + this.port)), this.query && fe.isObject(this.query) && Object.keys(this.query).length && (o = _t.stringify(this.query));
        var a = this.search || o && "?" + o || "";
        return e && e.substr(-1) !== ":" && (e += ":"), this.slashes || (!e || Ae[e]) && i !== !1 ? (i = "//" + (i || ""), t && t.charAt(0) !== "/" && (t = "/" + t)) : i || (i = ""), n && n.charAt(0) !== "#" && (n = "#" + n), a && a.charAt(0) !== "?" && (a = "?" + a), t = t.replace(/[?#]/g, function(s) {
            return encodeURIComponent(s)
        }), a = a.replace("#", "%23"), e + i + t + a + n
    }, me.prototype.resolve = function(r) {
        return this.resolveObject(So(r, !1, !0)).format()
    }, me.prototype.resolveObject = function(r) {
        if (fe.isString(r)) {
            var e = new me;
            e.parse(r, !1, !0), r = e
        }
        for (var t = new me, n = Object.keys(this), i = 0; i < n.length; i++) {
            var o = n[i];
            t[o] = this[o]
        }
        if (t.hash = r.hash, r.href === "") return t.href = t.format(), t;
        if (r.slashes && !r.protocol) {
            for (var a = Object.keys(r), s = 0; s < a.length; s++) {
                var l = a[s];
                l !== "protocol" && (t[l] = r[l])
            }
            return Ae[t.protocol] && t.hostname && !t.pathname && (t.path = t.pathname = "/"), t.href = t.format(), t
        }
        if (r.protocol && r.protocol !== t.protocol) {
            if (!Ae[r.protocol]) {
                for (var u = Object.keys(r), c = 0; c < u.length; c++) {
                    var p = u[c];
                    t[p] = r[p]
                }
                return t.href = t.format(), t
            }
            if (t.protocol = r.protocol, !r.host && !At[r.protocol]) {
                for (var b = (r.pathname || "").split("/"); b.length && !(r.host = b.shift()););
                r.host || (r.host = ""), r.hostname || (r.hostname = ""), b[0] !== "" && b.unshift(""), b.length < 2 && b.unshift(""), t.pathname = b.join("/")
            } else t.pathname = r.pathname;
            if (t.search = r.search, t.query = r.query, t.host = r.host || "", t.auth = r.auth, t.hostname = r.hostname || r.host, t.port = r.port, t.pathname || t.search) {
                var d = t.pathname || "",
                    m = t.search || "";
                t.path = d + m
            }
            return t.slashes = t.slashes || r.slashes, t.href = t.format(), t
        }
        var v = t.pathname && t.pathname.charAt(0) === "/",
            _ = r.host || r.pathname && r.pathname.charAt(0) === "/",
            j = _ || v || t.host && r.pathname,
            g = j,
            f = t.pathname && t.pathname.split("/") || [],
            b = r.pathname && r.pathname.split("/") || [],
            T = t.protocol && !Ae[t.protocol];
        if (T && (t.hostname = "", t.port = null, t.host && (f[0] === "" ? f[0] = t.host : f.unshift(t.host)), t.host = "", r.protocol && (r.hostname = null, r.port = null, r.host && (b[0] === "" ? b[0] = r.host : b.unshift(r.host)), r.host = null), j = j && (b[0] === "" || f[0] === "")), _) t.host = r.host || r.host === "" ? r.host : t.host, t.hostname = r.hostname || r.hostname === "" ? r.hostname : t.hostname, t.search = r.search, t.query = r.query, f = b;
        else if (b.length) f || (f = []), f.pop(), f = f.concat(b), t.search = r.search, t.query = r.query;
        else if (!fe.isNullOrUndefined(r.search)) {
            if (T) {
                t.hostname = t.host = f.shift();
                var h = t.host && t.host.indexOf("@") > 0 ? t.host.split("@") : !1;
                h && (t.auth = h.shift(), t.host = t.hostname = h.shift())
            }
            return t.search = r.search, t.query = r.query, (!fe.isNull(t.pathname) || !fe.isNull(t.search)) && (t.path = (t.pathname ? t.pathname : "") + (t.search ? t.search : "")), t.href = t.format(), t
        }
        if (!f.length) return t.pathname = null, t.search ? t.path = "/" + t.search : t.path = null, t.href = t.format(), t;
        for (var k = f.slice(-1)[0], Q = (t.host || r.host || f.length > 1) && (k === "." || k === "..") || k === "", A = 0, M = f.length; M >= 0; M--) k = f[M], k === "." ? f.splice(M, 1) : k === ".." ? (f.splice(M, 1), A++) : A && (f.splice(M, 1), A--);
        if (!j && !g)
            for (; A--; A) f.unshift("..");
        j && f[0] !== "" && (!f[0] || f[0].charAt(0) !== "/") && f.unshift(""), Q && f.join("/").substr(-1) !== "/" && f.push("");
        var ee = f[0] === "" || f[0] && f[0].charAt(0) === "/";
        if (T) {
            t.hostname = t.host = ee ? "" : f.length ? f.shift() : "";
            var h = t.host && t.host.indexOf("@") > 0 ? t.host.split("@") : !1;
            h && (t.auth = h.shift(), t.host = t.hostname = h.shift())
        }
        return j = j || t.host && f.length, j && !ee && f.unshift(""), f.length ? t.pathname = f.join("/") : (t.pathname = null, t.path = null), (!fe.isNull(t.pathname) || !fe.isNull(t.search)) && (t.path = (t.pathname ? t.pathname : "") + (t.search ? t.search : "")), t.auth = r.auth || t.auth, t.slashes = t.slashes || r.slashes, t.href = t.format(), t
    }, me.prototype.parseHost = function() {
        var r = this.host,
            e = jo.exec(r);
        e && (e = e[0], e !== ":" && (this.port = e.substr(1)), r = r.substr(0, r.length - e.length)), r && (this.hostname = r)
    };

    function Zr(r, ...e) {
        for (const t of e)
            for (const n in t) r[n] = t[n];
        return r
    }
    class Io extends Error {
        constructor(e, t) {
            super(t), this.message = t, this.key = e
        }
    }
    var he = Io;
    class St {
        constructor(e, t = []) {
            this.parent = e, this.bindings = {};
            for (const [n, i] of t) this.bindings[n] = i
        }
        concat(e) {
            return new St(this, e)
        }
        get(e) {
            if (this.bindings[e]) return this.bindings[e];
            if (this.parent) return this.parent.get(e);
            throw new Error(`${e} not found in scope.`)
        }
        has(e) {
            return this.bindings[e] ? !0 : this.parent ? this.parent.has(e) : !1
        }
    }
    var Ro = St;
    const tt = {
            kind: "null"
        },
        y = {
            kind: "number"
        },
        E = {
            kind: "string"
        },
        z = {
            kind: "boolean"
        },
        ye = {
            kind: "color"
        },
        _e = {
            kind: "object"
        },
        C = {
            kind: "value"
        },
        Oo = {
            kind: "error"
        },
        rt = {
            kind: "collator"
        },
        nt = {
            kind: "formatted"
        },
        Je = {
            kind: "resolvedImage"
        };

    function ae(r, e) {
        return {
            kind: "array",
            itemType: r,
            N: e
        }
    }

    function L(r) {
        if (r.kind === "array") {
            const e = L(r.itemType);
            return typeof r.N == "number" ? `array<${e}, ${r.N}>` : r.itemType.kind === "value" ? "array" : `array<${e}>`
        } else return r.kind
    }
    const qo = [tt, y, E, z, ye, nt, _e, ae(C), Je];

    function Ve(r, e) {
        if (e.kind === "error") return null;
        if (r.kind === "array") {
            if (e.kind === "array" && (e.N === 0 && e.itemType.kind === "value" || !Ve(r.itemType, e.itemType)) && (typeof r.N != "number" || r.N === e.N)) return null
        } else {
            if (r.kind === e.kind) return null;
            if (r.kind === "value") {
                for (const t of qo)
                    if (!Ve(t, e)) return null
            }
        }
        return `Expected ${L(r)} but found ${L(e)} instead.`
    }

    function It(r, e) {
        return e.some(t => t.kind === r.kind)
    }

    function He(r, e) {
        return e.some(t => t === "null" ? r === null : t === "array" ? Array.isArray(r) : t === "object" ? r && !Array.isArray(r) && typeof r == "object" : t === typeof r)
    }
    var Lo = {},
        Xr, Yr = {
            transparent: [0, 0, 0, 0],
            aliceblue: [240, 248, 255, 1],
            antiquewhite: [250, 235, 215, 1],
            aqua: [0, 255, 255, 1],
            aquamarine: [127, 255, 212, 1],
            azure: [240, 255, 255, 1],
            beige: [245, 245, 220, 1],
            bisque: [255, 228, 196, 1],
            black: [0, 0, 0, 1],
            blanchedalmond: [255, 235, 205, 1],
            blue: [0, 0, 255, 1],
            blueviolet: [138, 43, 226, 1],
            brown: [165, 42, 42, 1],
            burlywood: [222, 184, 135, 1],
            cadetblue: [95, 158, 160, 1],
            chartreuse: [127, 255, 0, 1],
            chocolate: [210, 105, 30, 1],
            coral: [255, 127, 80, 1],
            cornflowerblue: [100, 149, 237, 1],
            cornsilk: [255, 248, 220, 1],
            crimson: [220, 20, 60, 1],
            cyan: [0, 255, 255, 1],
            darkblue: [0, 0, 139, 1],
            darkcyan: [0, 139, 139, 1],
            darkgoldenrod: [184, 134, 11, 1],
            darkgray: [169, 169, 169, 1],
            darkgreen: [0, 100, 0, 1],
            darkgrey: [169, 169, 169, 1],
            darkkhaki: [189, 183, 107, 1],
            darkmagenta: [139, 0, 139, 1],
            darkolivegreen: [85, 107, 47, 1],
            darkorange: [255, 140, 0, 1],
            darkorchid: [153, 50, 204, 1],
            darkred: [139, 0, 0, 1],
            darksalmon: [233, 150, 122, 1],
            darkseagreen: [143, 188, 143, 1],
            darkslateblue: [72, 61, 139, 1],
            darkslategray: [47, 79, 79, 1],
            darkslategrey: [47, 79, 79, 1],
            darkturquoise: [0, 206, 209, 1],
            darkviolet: [148, 0, 211, 1],
            deeppink: [255, 20, 147, 1],
            deepskyblue: [0, 191, 255, 1],
            dimgray: [105, 105, 105, 1],
            dimgrey: [105, 105, 105, 1],
            dodgerblue: [30, 144, 255, 1],
            firebrick: [178, 34, 34, 1],
            floralwhite: [255, 250, 240, 1],
            forestgreen: [34, 139, 34, 1],
            fuchsia: [255, 0, 255, 1],
            gainsboro: [220, 220, 220, 1],
            ghostwhite: [248, 248, 255, 1],
            gold: [255, 215, 0, 1],
            goldenrod: [218, 165, 32, 1],
            gray: [128, 128, 128, 1],
            green: [0, 128, 0, 1],
            greenyellow: [173, 255, 47, 1],
            grey: [128, 128, 128, 1],
            honeydew: [240, 255, 240, 1],
            hotpink: [255, 105, 180, 1],
            indianred: [205, 92, 92, 1],
            indigo: [75, 0, 130, 1],
            ivory: [255, 255, 240, 1],
            khaki: [240, 230, 140, 1],
            lavender: [230, 230, 250, 1],
            lavenderblush: [255, 240, 245, 1],
            lawngreen: [124, 252, 0, 1],
            lemonchiffon: [255, 250, 205, 1],
            lightblue: [173, 216, 230, 1],
            lightcoral: [240, 128, 128, 1],
            lightcyan: [224, 255, 255, 1],
            lightgoldenrodyellow: [250, 250, 210, 1],
            lightgray: [211, 211, 211, 1],
            lightgreen: [144, 238, 144, 1],
            lightgrey: [211, 211, 211, 1],
            lightpink: [255, 182, 193, 1],
            lightsalmon: [255, 160, 122, 1],
            lightseagreen: [32, 178, 170, 1],
            lightskyblue: [135, 206, 250, 1],
            lightslategray: [119, 136, 153, 1],
            lightslategrey: [119, 136, 153, 1],
            lightsteelblue: [176, 196, 222, 1],
            lightyellow: [255, 255, 224, 1],
            lime: [0, 255, 0, 1],
            limegreen: [50, 205, 50, 1],
            linen: [250, 240, 230, 1],
            magenta: [255, 0, 255, 1],
            maroon: [128, 0, 0, 1],
            mediumaquamarine: [102, 205, 170, 1],
            mediumblue: [0, 0, 205, 1],
            mediumorchid: [186, 85, 211, 1],
            mediumpurple: [147, 112, 219, 1],
            mediumseagreen: [60, 179, 113, 1],
            mediumslateblue: [123, 104, 238, 1],
            mediumspringgreen: [0, 250, 154, 1],
            mediumturquoise: [72, 209, 204, 1],
            mediumvioletred: [199, 21, 133, 1],
            midnightblue: [25, 25, 112, 1],
            mintcream: [245, 255, 250, 1],
            mistyrose: [255, 228, 225, 1],
            moccasin: [255, 228, 181, 1],
            navajowhite: [255, 222, 173, 1],
            navy: [0, 0, 128, 1],
            oldlace: [253, 245, 230, 1],
            olive: [128, 128, 0, 1],
            olivedrab: [107, 142, 35, 1],
            orange: [255, 165, 0, 1],
            orangered: [255, 69, 0, 1],
            orchid: [218, 112, 214, 1],
            palegoldenrod: [238, 232, 170, 1],
            palegreen: [152, 251, 152, 1],
            paleturquoise: [175, 238, 238, 1],
            palevioletred: [219, 112, 147, 1],
            papayawhip: [255, 239, 213, 1],
            peachpuff: [255, 218, 185, 1],
            peru: [205, 133, 63, 1],
            pink: [255, 192, 203, 1],
            plum: [221, 160, 221, 1],
            powderblue: [176, 224, 230, 1],
            purple: [128, 0, 128, 1],
            rebeccapurple: [102, 51, 153, 1],
            red: [255, 0, 0, 1],
            rosybrown: [188, 143, 143, 1],
            royalblue: [65, 105, 225, 1],
            saddlebrown: [139, 69, 19, 1],
            salmon: [250, 128, 114, 1],
            sandybrown: [244, 164, 96, 1],
            seagreen: [46, 139, 87, 1],
            seashell: [255, 245, 238, 1],
            sienna: [160, 82, 45, 1],
            silver: [192, 192, 192, 1],
            skyblue: [135, 206, 235, 1],
            slateblue: [106, 90, 205, 1],
            slategray: [112, 128, 144, 1],
            slategrey: [112, 128, 144, 1],
            snow: [255, 250, 250, 1],
            springgreen: [0, 255, 127, 1],
            steelblue: [70, 130, 180, 1],
            tan: [210, 180, 140, 1],
            teal: [0, 128, 128, 1],
            thistle: [216, 191, 216, 1],
            tomato: [255, 99, 71, 1],
            turquoise: [64, 224, 208, 1],
            violet: [238, 130, 238, 1],
            wheat: [245, 222, 179, 1],
            white: [255, 255, 255, 1],
            whitesmoke: [245, 245, 245, 1],
            yellow: [255, 255, 0, 1],
            yellowgreen: [154, 205, 50, 1]
        };

    function Ge(r) {
        return r = Math.round(r), r < 0 ? 0 : r > 255 ? 255 : r
    }

    function Kr(r) {
        return r < 0 ? 0 : r > 1 ? 1 : r
    }

    function Rt(r) {
        return r[r.length - 1] === "%" ? Ge(parseFloat(r) / 100 * 255) : Ge(parseInt(r))
    }

    function it(r) {
        return r[r.length - 1] === "%" ? Kr(parseFloat(r) / 100) : Kr(parseFloat(r))
    }

    function Ot(r, e, t) {
        return t < 0 ? t += 1 : t > 1 && (t -= 1), t * 6 < 1 ? r + (e - r) * t * 6 : t * 2 < 1 ? e : t * 3 < 2 ? r + (e - r) * (2 / 3 - t) * 6 : r
    }

    function No(r) {
        var e = r.replace(/ /g, "").toLowerCase();
        if (e in Yr) return Yr[e].slice();
        if (e[0] === "#") {
            if (e.length === 4) {
                var t = parseInt(e.substr(1), 16);
                return t >= 0 && t <= 4095 ? [(t & 3840) >> 4 | (t & 3840) >> 8, t & 240 | (t & 240) >> 4, t & 15 | (t & 15) << 4, 1] : null
            } else if (e.length === 7) {
                var t = parseInt(e.substr(1), 16);
                return t >= 0 && t <= 16777215 ? [(t & 16711680) >> 16, (t & 65280) >> 8, t & 255, 1] : null
            }
            return null
        }
        var n = e.indexOf("("),
            i = e.indexOf(")");
        if (n !== -1 && i + 1 === e.length) {
            var o = e.substr(0, n),
                a = e.substr(n + 1, i - (n + 1)).split(","),
                s = 1;
            switch (o) {
                case "rgba":
                    if (a.length !== 4) return null;
                    s = it(a.pop());
                case "rgb":
                    return a.length !== 3 ? null : [Rt(a[0]), Rt(a[1]), Rt(a[2]), s];
                case "hsla":
                    if (a.length !== 4) return null;
                    s = it(a.pop());
                case "hsl":
                    if (a.length !== 3) return null;
                    var l = (parseFloat(a[0]) % 360 + 360) % 360 / 360,
                        u = it(a[1]),
                        c = it(a[2]),
                        p = c <= .5 ? c * (u + 1) : c + u - c * u,
                        d = c * 2 - p;
                    return [Ge(Ot(d, p, l + 1 / 3) * 255), Ge(Ot(d, p, l) * 255), Ge(Ot(d, p, l - 1 / 3) * 255), s];
                default:
                    return null
            }
        }
        return null
    }
    try {
        Xr = Lo.parseCSSColor = No
    } catch {}
    class Y {
        constructor(e, t, n, i = 1) {
            this.r = e, this.g = t, this.b = n, this.a = i
        }
        static parse(e) {
            if (!e) return;
            if (e instanceof Y) return e;
            if (typeof e != "string") return;
            const t = Xr(e);
            if (t) return new Y(t[0] / 255 * t[3], t[1] / 255 * t[3], t[2] / 255 * t[3], t[3])
        }
        toString() {
            const [e, t, n, i] = this.toArray();
            return `rgba(${Math.round(e)},${Math.round(t)},${Math.round(n)},${i})`
        }
        toArray() {
            const {
                r: e,
                g: t,
                b: n,
                a: i
            } = this;
            return i === 0 ? [0, 0, 0, 0] : [e * 255 / i, t * 255 / i, n * 255 / i, i]
        }
        toArray01() {
            const {
                r: e,
                g: t,
                b: n,
                a: i
            } = this;
            return i === 0 ? [0, 0, 0, 0] : [e / i, t / i, n / i, i]
        }
        toArray01PremultipliedAlpha() {
            const {
                r: e,
                g: t,
                b: n,
                a: i
            } = this;
            return [e, t, n, i]
        }
    }
    Y.black = new Y(0, 0, 0, 1), Y.white = new Y(1, 1, 1, 1), Y.transparent = new Y(0, 0, 0, 0), Y.red = new Y(1, 0, 0, 1), Y.blue = new Y(0, 0, 1, 1);
    var B = Y;
    class qt {
        constructor(e, t, n) {
            e ? this.sensitivity = t ? "variant" : "case" : this.sensitivity = t ? "accent" : "base", this.locale = n, this.collator = new Intl.Collator(this.locale ? this.locale : [], {
                sensitivity: this.sensitivity,
                usage: "search"
            })
        }
        compare(e, t) {
            return this.collator.compare(e, t)
        }
        resolvedLocale() {
            return new Intl.Collator(this.locale ? this.locale : []).resolvedOptions().locale
        }
    }
    class Lt {
        constructor(e, t, n, i, o) {
            this.text = e.normalize ? e.normalize() : e, this.image = t, this.scale = n, this.fontStack = i, this.textColor = o
        }
    }
    class ce {
        constructor(e) {
            this.sections = e
        }
        static fromString(e) {
            return new ce([new Lt(e, null, null, null, null)])
        }
        isEmpty() {
            return this.sections.length === 0 ? !0 : !this.sections.some(e => e.text.length !== 0 || e.image && e.image.name.length !== 0)
        }
        static factory(e) {
            return e instanceof ce ? e : ce.fromString(e)
        }
        toString() {
            return this.sections.length === 0 ? "" : this.sections.map(e => e.text).join("")
        }
        serialize() {
            const e = ["format"];
            for (const t of this.sections) {
                if (t.image) {
                    e.push(["image", t.image.name]);
                    continue
                }
                e.push(t.text);
                const n = {};
                t.fontStack && (n["text-font"] = ["literal", t.fontStack.split(",")]), t.scale && (n["font-scale"] = t.scale), t.textColor && (n["text-color"] = ["rgba"].concat(t.textColor.toArray())), e.push(n)
            }
            return e
        }
    }
    class ge {
        constructor(e) {
            this.name = e.name, this.available = e.available
        }
        toString() {
            return this.name
        }
        static fromString(e) {
            return e ? new ge({
                name: e,
                available: !1
            }) : null
        }
        serialize() {
            return ["image", this.name]
        }
    }

    function Qr(r, e, t, n) {
        return typeof r == "number" && r >= 0 && r <= 255 && typeof e == "number" && e >= 0 && e <= 255 && typeof t == "number" && t >= 0 && t <= 255 ? typeof n > "u" || typeof n == "number" && n >= 0 && n <= 1 ? null : `Invalid rgba value [${[r,e,t,n].join(", ")}]: 'a' must be between 0 and 1.` : `Invalid rgba value [${(typeof n=="number"?[r,e,t,n]:[r,e,t]).join(", ")}]: 'r', 'g', and 'b' must be between 0 and 255.`
    }

    function ot(r) {
        if (r === null) return !0;
        if (typeof r == "string") return !0;
        if (typeof r == "boolean") return !0;
        if (typeof r == "number") return !0;
        if (r instanceof B) return !0;
        if (r instanceof qt) return !0;
        if (r instanceof ce) return !0;
        if (r instanceof ge) return !0;
        if (Array.isArray(r)) {
            for (const e of r)
                if (!ot(e)) return !1;
            return !0
        } else if (typeof r == "object") {
            for (const e in r)
                if (!ot(r[e])) return !1;
            return !0
        } else return !1
    }

    function P(r) {
        if (r === null) return tt;
        if (typeof r == "string") return E;
        if (typeof r == "boolean") return z;
        if (typeof r == "number") return y;
        if (r instanceof B) return ye;
        if (r instanceof qt) return rt;
        if (r instanceof ce) return nt;
        if (r instanceof ge) return Je;
        if (Array.isArray(r)) {
            const e = r.length;
            let t;
            for (const n of r) {
                const i = P(n);
                if (!t) t = i;
                else {
                    if (t === i) continue;
                    t = C;
                    break
                }
            }
            return ae(t || C, e)
        } else return _e
    }

    function Ze(r) {
        const e = typeof r;
        return r === null ? "" : e === "string" || e === "number" || e === "boolean" ? String(r) : r instanceof B || r instanceof ce || r instanceof ge ? r.toString() : JSON.stringify(r)
    }
    class Nt {
        constructor(e, t) {
            this.type = e, this.value = t
        }
        static parse(e, t) {
            if (e.length !== 2) return t.error(`'literal' expression requires exactly one argument, but found ${e.length-1} instead.`);
            if (!ot(e[1])) return t.error("invalid value");
            const n = e[1];
            let i = P(n);
            const o = t.expectedType;
            return i.kind === "array" && i.N === 0 && o && o.kind === "array" && (typeof o.N != "number" || o.N === 0) && (i = o), new Nt(i, n)
        }
        evaluate() {
            return this.value
        }
        eachChild() {}
        outputDefined() {
            return !0
        }
        serialize() {
            return this.type.kind === "array" || this.type.kind === "object" ? ["literal", this.value] : this.value instanceof B ? ["rgba"].concat(this.value.toArray()) : this.value instanceof ce ? this.value.serialize() : this.value
        }
    }
    var at = Nt;
    class Do {
        constructor(e) {
            this.name = "ExpressionEvaluationError", this.message = e
        }
        toJSON() {
            return this.message
        }
    }
    var W = Do;
    const Dt = {
        string: E,
        number: y,
        boolean: z,
        object: _e
    };
    class Pt {
        constructor(e, t) {
            this.type = e, this.args = t
        }
        static parse(e, t) {
            if (e.length < 2) return t.error("Expected at least one argument.");
            let n = 1,
                i;
            const o = e[0];
            if (o === "array") {
                let s;
                if (e.length > 2) {
                    const u = e[1];
                    if (typeof u != "string" || !(u in Dt) || u === "object") return t.error('The item type argument of "array" must be one of string, number, boolean', 1);
                    s = Dt[u], n++
                } else s = C;
                let l;
                if (e.length > 3) {
                    if (e[2] !== null && (typeof e[2] != "number" || e[2] < 0 || e[2] !== Math.floor(e[2]))) return t.error('The length argument to "array" must be a positive integer literal', 2);
                    l = e[2], n++
                }
                i = ae(s, l)
            } else i = Dt[o];
            const a = [];
            for (; n < e.length; n++) {
                const s = t.parse(e[n], n, C);
                if (!s) return null;
                a.push(s)
            }
            return new Pt(i, a)
        }
        evaluate(e) {
            for (let t = 0; t < this.args.length; t++) {
                const n = this.args[t].evaluate(e);
                if (Ve(this.type, P(n))) {
                    if (t === this.args.length - 1) throw new W(`Expected value to be of type ${L(this.type)}, but found ${L(P(n))} instead.`)
                } else return n
            }
            return null
        }
        eachChild(e) {
            this.args.forEach(e)
        }
        outputDefined() {
            return this.args.every(e => e.outputDefined())
        }
        serialize() {
            const e = this.type,
                t = [e.kind];
            if (e.kind === "array") {
                const n = e.itemType;
                if (n.kind === "string" || n.kind === "number" || n.kind === "boolean") {
                    t.push(n.kind);
                    const i = e.N;
                    (typeof i == "number" || this.args.length > 1) && t.push(i)
                }
            }
            return t.concat(this.args.map(n => n.serialize()))
        }
    }
    var be = Pt;
    class st {
        constructor(e) {
            this.type = nt, this.sections = e
        }
        static parse(e, t) {
            if (e.length < 2) return t.error("Expected at least one argument.");
            const n = e[1];
            if (!Array.isArray(n) && typeof n == "object") return t.error("First argument must be an image or text section.");
            const i = [];
            let o = !1;
            for (let a = 1; a <= e.length - 1; ++a) {
                const s = e[a];
                if (o && typeof s == "object" && !Array.isArray(s)) {
                    o = !1;
                    let l = null;
                    if (s["font-scale"] && (l = t.parse(s["font-scale"], 1, y), !l)) return null;
                    let u = null;
                    if (s["text-font"] && (u = t.parse(s["text-font"], 1, ae(E)), !u)) return null;
                    let c = null;
                    if (s["text-color"] && (c = t.parse(s["text-color"], 1, ye), !c)) return null;
                    const p = i[i.length - 1];
                    p.scale = l, p.font = u, p.textColor = c
                } else {
                    const l = t.parse(e[a], 1, C);
                    if (!l) return null;
                    const u = l.type.kind;
                    if (u !== "string" && u !== "value" && u !== "null" && u !== "resolvedImage") return t.error("Formatted text type must be 'string', 'value', 'image' or 'null'.");
                    o = !0, i.push({
                        content: l,
                        scale: null,
                        font: null,
                        textColor: null
                    })
                }
            }
            return new st(i)
        }
        evaluate(e) {
            const t = n => {
                const i = n.content.evaluate(e);
                return P(i) === Je ? new Lt("", i, null, null, null) : new Lt(Ze(i), null, n.scale ? n.scale.evaluate(e) : null, n.font ? n.font.evaluate(e).join(",") : null, n.textColor ? n.textColor.evaluate(e) : null)
            };
            return new ce(this.sections.map(t))
        }
        eachChild(e) {
            for (const t of this.sections) e(t.content), t.scale && e(t.scale), t.font && e(t.font), t.textColor && e(t.textColor)
        }
        outputDefined() {
            return !1
        }
        serialize() {
            const e = ["format"];
            for (const t of this.sections) {
                e.push(t.content.serialize());
                const n = {};
                t.scale && (n["font-scale"] = t.scale.serialize()), t.font && (n["text-font"] = t.font.serialize()), t.textColor && (n["text-color"] = t.textColor.serialize()), e.push(n)
            }
            return e
        }
    }
    class lt {
        constructor(e) {
            this.type = Je, this.input = e
        }
        static parse(e, t) {
            if (e.length !== 2) return t.error("Expected two arguments.");
            const n = t.parse(e[1], 1, E);
            return n ? new lt(n) : t.error("No image name provided.")
        }
        evaluate(e) {
            const t = this.input.evaluate(e),
                n = ge.fromString(t);
            return n && e.availableImages && (n.available = e.availableImages.indexOf(t) > -1), n
        }
        eachChild(e) {
            e(this.input)
        }
        outputDefined() {
            return !1
        }
        serialize() {
            return ["image", this.input.serialize()]
        }
    }
    const Po = {
        "to-boolean": z,
        "to-color": ye,
        "to-number": y,
        "to-string": E
    };
    class Mt {
        constructor(e, t) {
            this.type = e, this.args = t
        }
        static parse(e, t) {
            if (e.length < 2) return t.error("Expected at least one argument.");
            const n = e[0];
            if ((n === "to-boolean" || n === "to-string") && e.length !== 2) return t.error("Expected one argument.");
            const i = Po[n],
                o = [];
            for (let a = 1; a < e.length; a++) {
                const s = t.parse(e[a], a, C);
                if (!s) return null;
                o.push(s)
            }
            return new Mt(i, o)
        }
        evaluate(e) {
            if (this.type.kind === "boolean") return !!this.args[0].evaluate(e);
            if (this.type.kind === "color") {
                let t, n;
                for (const i of this.args) {
                    if (t = i.evaluate(e), n = null, t instanceof B) return t;
                    if (typeof t == "string") {
                        const o = e.parseColor(t);
                        if (o) return o
                    } else if (Array.isArray(t) && (t.length < 3 || t.length > 4 ? n = `Invalid rbga value ${JSON.stringify(t)}: expected an array containing either three or four numeric values.` : n = Qr(t[0], t[1], t[2], t[3]), !n)) return new B(t[0] / 255, t[1] / 255, t[2] / 255, t[3])
                }
                throw new W(n || `Could not parse color from value '${typeof t=="string"?t:String(JSON.stringify(t))}'`)
            } else if (this.type.kind === "number") {
                let t = null;
                for (const n of this.args) {
                    if (t = n.evaluate(e), t === null) return 0;
                    const i = Number(t);
                    if (!isNaN(i)) return i
                }
                throw new W(`Could not convert ${JSON.stringify(t)} to number.`)
            } else return this.type.kind === "formatted" ? ce.fromString(Ze(this.args[0].evaluate(e))) : this.type.kind === "resolvedImage" ? ge.fromString(Ze(this.args[0].evaluate(e))) : Ze(this.args[0].evaluate(e))
        }
        eachChild(e) {
            this.args.forEach(e)
        }
        outputDefined() {
            return this.args.every(e => e.outputDefined())
        }
        serialize() {
            if (this.type.kind === "formatted") return new st([{
                content: this.args[0],
                scale: null,
                font: null,
                textColor: null
            }]).serialize();
            if (this.type.kind === "resolvedImage") return new lt(this.args[0]).serialize();
            const e = [`to-${this.type.kind}`];
            return this.eachChild(t => {
                e.push(t.serialize())
            }), e
        }
    }
    var Se = Mt;
    const Mo = ["Unknown", "Point", "LineString", "Polygon"];
    class $o {
        constructor() {
            this.globals = null, this.feature = null, this.featureState = null, this.formattedSection = null, this._parseColorCache = {}, this.availableImages = null, this.canonical = null, this.featureTileCoord = null, this.featureDistanceData = null
        }
        id() {
            return this.feature && this.feature.id !== void 0 ? this.feature.id : null
        }
        geometryType() {
            return this.feature ? typeof this.feature.type == "number" ? Mo[this.feature.type] : this.feature.type : null
        }
        geometry() {
            return this.feature && "geometry" in this.feature ? this.feature.geometry : null
        }
        canonicalID() {
            return this.canonical
        }
        properties() {
            return this.feature && this.feature.properties || {}
        }
        distanceFromCenter() {
            if (this.featureTileCoord && this.featureDistanceData) {
                const e = this.featureDistanceData.center,
                    t = this.featureDistanceData.scale,
                    {
                        x: n,
                        y: i
                    } = this.featureTileCoord,
                    o = n * t - e[0],
                    a = i * t - e[1],
                    s = this.featureDistanceData.bearing[0],
                    l = this.featureDistanceData.bearing[1];
                return s * o + l * a
            }
            return 0
        }
        parseColor(e) {
            let t = this._parseColorCache[e];
            return t || (t = this._parseColorCache[e] = B.parse(e)), t
        }
    }
    var en = $o;
    class Ie {
        constructor(e, t, n, i) {
            this.name = e, this.type = t, this._evaluate = n, this.args = i
        }
        evaluate(e) {
            return this._evaluate(e, this.args)
        }
        eachChild(e) {
            this.args.forEach(e)
        }
        outputDefined() {
            return !1
        }
        serialize() {
            return [this.name].concat(this.args.map(e => e.serialize()))
        }
        static parse(e, t) {
            const n = e[0],
                i = Ie.definitions[n];
            if (!i) return t.error(`Unknown expression "${n}". If you wanted a literal array, use ["literal", [...]].`, 0);
            const o = Array.isArray(i) ? i[0] : i.type,
                a = Array.isArray(i) ? [
                    [i[1], i[2]]
                ] : i.overloads,
                s = a.filter(([u]) => !Array.isArray(u) || u.length === e.length - 1);
            let l = null;
            for (const [u, c] of s) {
                l = new un(t.registry, t.path, null, t.scope);
                const p = [];
                let d = !1;
                for (let m = 1; m < e.length; m++) {
                    const v = e[m],
                        _ = Array.isArray(u) ? u[m - 1] : u.type,
                        j = l.parse(v, 1 + p.length, _);
                    if (!j) {
                        d = !0;
                        break
                    }
                    p.push(j)
                }
                if (!d) {
                    if (Array.isArray(u) && u.length !== p.length) {
                        l.error(`Expected ${u.length} arguments, but found ${p.length} instead.`);
                        continue
                    }
                    for (let m = 0; m < p.length; m++) {
                        const v = Array.isArray(u) ? u[m] : u.type,
                            _ = p[m];
                        l.concat(m + 1).checkSubtype(v, _.type)
                    }
                    if (l.errors.length === 0) return new Ie(n, o, c, p)
                }
            }
            if (s.length === 1) t.errors.push(...l.errors);
            else {
                const c = (s.length ? s : a).map(([d]) => Fo(d)).join(" | "),
                    p = [];
                for (let d = 1; d < e.length; d++) {
                    const m = t.parse(e[d], 1 + p.length);
                    if (!m) return null;
                    p.push(L(m.type))
                }
                t.error(`Expected arguments of type ${c}, but found (${p.join(", ")}) instead.`)
            }
            return null
        }
        static register(e, t) {
            Ie.definitions = t;
            for (const n in t) e[n] = Ie
        }
    }

    function Fo(r) {
        return Array.isArray(r) ? `(${r.map(L).join(", ")})` : `(${L(r.type)}...)`
    }
    var Re = Ie;
    class ut {
        constructor(e, t, n) {
            this.type = rt, this.locale = n, this.caseSensitive = e, this.diacriticSensitive = t
        }
        static parse(e, t) {
            if (e.length !== 2) return t.error("Expected one argument.");
            const n = e[1];
            if (typeof n != "object" || Array.isArray(n)) return t.error("Collator options argument must be an object.");
            const i = t.parse(n["case-sensitive"] === void 0 ? !1 : n["case-sensitive"], 1, z);
            if (!i) return null;
            const o = t.parse(n["diacritic-sensitive"] === void 0 ? !1 : n["diacritic-sensitive"], 1, z);
            if (!o) return null;
            let a = null;
            return n.locale && (a = t.parse(n.locale, 1, E), !a) ? null : new ut(i, o, a)
        }
        evaluate(e) {
            return new qt(this.caseSensitive.evaluate(e), this.diacriticSensitive.evaluate(e), this.locale ? this.locale.evaluate(e) : null)
        }
        eachChild(e) {
            e(this.caseSensitive), e(this.diacriticSensitive), this.locale && e(this.locale)
        }
        outputDefined() {
            return !1
        }
        serialize() {
            const e = {};
            return e["case-sensitive"] = this.caseSensitive.serialize(), e["diacritic-sensitive"] = this.diacriticSensitive.serialize(), this.locale && (e.locale = this.locale.serialize()), ["collator", e]
        }
    }
    const xe = 8192;

    function $t(r, e) {
        r[0] = Math.min(r[0], e[0]), r[1] = Math.min(r[1], e[1]), r[2] = Math.max(r[2], e[0]), r[3] = Math.max(r[3], e[1])
    }

    function Uo(r) {
        return (180 + r) / 360
    }

    function Bo(r) {
        return (180 - 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + r * Math.PI / 360))) / 360
    }

    function ct(r, e) {
        return !(r[0] <= e[0] || r[2] >= e[2] || r[1] <= e[1] || r[3] >= e[3])
    }

    function Wo(r, e) {
        const t = Uo(r[0]),
            n = Bo(r[1]),
            i = Math.pow(2, e.z);
        return [Math.round(t * i * xe), Math.round(n * i * xe)]
    }

    function Jo(r, e, t) {
        const n = r[0] - e[0],
            i = r[1] - e[1],
            o = r[0] - t[0],
            a = r[1] - t[1];
        return n * a - o * i === 0 && n * o <= 0 && i * a <= 0
    }

    function Vo(r, e, t) {
        return e[1] > r[1] != t[1] > r[1] && r[0] < (t[0] - e[0]) * (r[1] - e[1]) / (t[1] - e[1]) + e[0]
    }

    function Ft(r, e) {
        let t = !1;
        for (let n = 0, i = e.length; n < i; n++) {
            const o = e[n];
            for (let a = 0, s = o.length; a < s - 1; a++) {
                if (Jo(r, o[a], o[a + 1])) return !1;
                Vo(r, o[a], o[a + 1]) && (t = !t)
            }
        }
        return t
    }

    function Ho(r, e) {
        for (let t = 0; t < e.length; t++)
            if (Ft(r, e[t])) return !0;
        return !1
    }

    function Go(r, e) {
        return r[0] * e[1] - r[1] * e[0]
    }

    function tn(r, e, t, n) {
        const i = r[0] - t[0],
            o = r[1] - t[1],
            a = e[0] - t[0],
            s = e[1] - t[1],
            l = n[0] - t[0],
            u = n[1] - t[1],
            c = i * u - l * o,
            p = a * u - l * s;
        return c > 0 && p < 0 || c < 0 && p > 0
    }

    function Zo(r, e, t, n) {
        const i = [e[0] - r[0], e[1] - r[1]],
            o = [n[0] - t[0], n[1] - t[1]];
        return Go(o, i) === 0 ? !1 : !!(tn(r, e, t, n) && tn(t, n, r, e))
    }

    function Xo(r, e, t) {
        for (const n of t)
            for (let i = 0; i < n.length - 1; ++i)
                if (Zo(r, e, n[i], n[i + 1])) return !0;
        return !1
    }

    function rn(r, e) {
        for (let t = 0; t < r.length; ++t)
            if (!Ft(r[t], e)) return !1;
        for (let t = 0; t < r.length - 1; ++t)
            if (Xo(r[t], r[t + 1], e)) return !1;
        return !0
    }

    function Yo(r, e) {
        for (let t = 0; t < e.length; t++)
            if (rn(r, e[t])) return !0;
        return !1
    }

    function Ut(r, e, t) {
        const n = [];
        for (let i = 0; i < r.length; i++) {
            const o = [];
            for (let a = 0; a < r[i].length; a++) {
                const s = Wo(r[i][a], t);
                $t(e, s), o.push(s)
            }
            n.push(o)
        }
        return n
    }

    function nn(r, e, t) {
        const n = [];
        for (let i = 0; i < r.length; i++) {
            const o = Ut(r[i], e, t);
            n.push(o)
        }
        return n
    }

    function on(r, e, t, n) {
        if (r[0] < t[0] || r[0] > t[2]) {
            const i = n * .5;
            let o = r[0] - t[0] > i ? -n : t[0] - r[0] > i ? n : 0;
            o === 0 && (o = r[0] - t[2] > i ? -n : t[2] - r[0] > i ? n : 0), r[0] += o
        }
        $t(e, r)
    }

    function Ko(r) {
        r[0] = r[1] = 1 / 0, r[2] = r[3] = -1 / 0
    }

    function an(r, e, t, n) {
        const i = Math.pow(2, n.z) * xe,
            o = [n.x * xe, n.y * xe],
            a = [];
        if (!r) return a;
        for (const s of r)
            for (const l of s) {
                const u = [l.x + o[0], l.y + o[1]];
                on(u, e, t, i), a.push(u)
            }
        return a
    }

    function sn(r, e, t, n) {
        const i = Math.pow(2, n.z) * xe,
            o = [n.x * xe, n.y * xe],
            a = [];
        if (!r) return a;
        for (const s of r) {
            const l = [];
            for (const u of s) {
                const c = [u.x + o[0], u.y + o[1]];
                $t(e, c), l.push(c)
            }
            a.push(l)
        }
        if (e[2] - e[0] <= i / 2) {
            Ko(e);
            for (const s of a)
                for (const l of s) on(l, e, t, i)
        }
        return a
    }

    function Qo(r, e) {
        const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0],
            n = [1 / 0, 1 / 0, -1 / 0, -1 / 0],
            i = r.canonicalID();
        if (!i) return !1;
        if (e.type === "Polygon") {
            const o = Ut(e.coordinates, n, i),
                a = an(r.geometry(), t, n, i);
            if (!ct(t, n)) return !1;
            for (const s of a)
                if (!Ft(s, o)) return !1
        }
        if (e.type === "MultiPolygon") {
            const o = nn(e.coordinates, n, i),
                a = an(r.geometry(), t, n, i);
            if (!ct(t, n)) return !1;
            for (const s of a)
                if (!Ho(s, o)) return !1
        }
        return !0
    }

    function ea(r, e) {
        const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0],
            n = [1 / 0, 1 / 0, -1 / 0, -1 / 0],
            i = r.canonicalID();
        if (!i) return !1;
        if (e.type === "Polygon") {
            const o = Ut(e.coordinates, n, i),
                a = sn(r.geometry(), t, n, i);
            if (!ct(t, n)) return !1;
            for (const s of a)
                if (!rn(s, o)) return !1
        }
        if (e.type === "MultiPolygon") {
            const o = nn(e.coordinates, n, i),
                a = sn(r.geometry(), t, n, i);
            if (!ct(t, n)) return !1;
            for (const s of a)
                if (!Yo(s, o)) return !1
        }
        return !0
    }
    class Xe {
        constructor(e, t) {
            this.type = z, this.geojson = e, this.geometries = t
        }
        static parse(e, t) {
            if (e.length !== 2) return t.error(`'within' expression requires exactly one argument, but found ${e.length-1} instead.`);
            if (ot(e[1])) {
                const n = e[1];
                if (n.type === "FeatureCollection")
                    for (let i = 0; i < n.features.length; ++i) {
                        const o = n.features[i].geometry.type;
                        if (o === "Polygon" || o === "MultiPolygon") return new Xe(n, n.features[i].geometry)
                    } else if (n.type === "Feature") {
                        const i = n.geometry.type;
                        if (i === "Polygon" || i === "MultiPolygon") return new Xe(n, n.geometry)
                    } else if (n.type === "Polygon" || n.type === "MultiPolygon") return new Xe(n, n)
            }
            return t.error("'within' expression requires valid geojson object that contains polygon geometry type.")
        }
        evaluate(e) {
            if (e.geometry() != null && e.canonicalID() != null) {
                if (e.geometryType() === "Point") return Qo(e, this.geometries);
                if (e.geometryType() === "LineString") return ea(e, this.geometries)
            }
            return !1
        }
        eachChild() {}
        outputDefined() {
            return !0
        }
        serialize() {
            return ["within", this.geojson]
        }
    }
    var Bt = Xe;

    function Wt(r) {
        if (r instanceof Re) {
            if (r.name === "get" && r.args.length === 1) return !1;
            if (r.name === "feature-state") return !1;
            if (r.name === "has" && r.args.length === 1) return !1;
            if (r.name === "properties" || r.name === "geometry-type" || r.name === "id") return !1;
            if (/^filter-/.test(r.name)) return !1
        }
        if (r instanceof Bt) return !1;
        let e = !0;
        return r.eachChild(t => {
            e && !Wt(t) && (e = !1)
        }), e
    }

    function Jt(r) {
        if (r instanceof Re && r.name === "feature-state") return !1;
        let e = !0;
        return r.eachChild(t => {
            e && !Jt(t) && (e = !1)
        }), e
    }

    function Vt(r, e) {
        if (r instanceof Re && e.indexOf(r.name) >= 0) return !1;
        let t = !0;
        return r.eachChild(n => {
            t && !Vt(n, e) && (t = !1)
        }), t
    }
    class Ht {
        constructor(e, t) {
            this.type = t.type, this.name = e, this.boundExpression = t
        }
        static parse(e, t) {
            if (e.length !== 2 || typeof e[1] != "string") return t.error("'var' expression requires exactly one string literal argument.");
            const n = e[1];
            return t.scope.has(n) ? new Ht(n, t.scope.get(n)) : t.error(`Unknown variable "${n}". Make sure "${n}" has been bound in an enclosing "let" expression before using it.`, 1)
        }
        evaluate(e) {
            return this.boundExpression.evaluate(e)
        }
        eachChild() {}
        outputDefined() {
            return !1
        }
        serialize() {
            return ["var", this.name]
        }
    }
    var ln = Ht;
    class Gt {
        constructor(e, t = [], n, i = new Ro, o = []) {
            this.registry = e, this.path = t, this.key = t.map(a => `[${a}]`).join(""), this.scope = i, this.errors = o, this.expectedType = n
        }
        parse(e, t, n, i, o = {}) {
            return t ? this.concat(t, n, i)._parse(e, o) : this._parse(e, o)
        }
        _parse(e, t) {
            (e === null || typeof e == "string" || typeof e == "boolean" || typeof e == "number") && (e = ["literal", e]);

            function n(i, o, a) {
                return a === "assert" ? new be(o, [i]) : a === "coerce" ? new Se(o, [i]) : i
            }
            if (Array.isArray(e)) {
                if (e.length === 0) return this.error('Expected an array with at least one element. If you wanted a literal array, use ["literal", []].');
                const i = e[0];
                if (typeof i != "string") return this.error(`Expression name must be a string, but found ${typeof i} instead. If you wanted a literal array, use ["literal", [...]].`, 0), null;
                const o = this.registry[i];
                if (o) {
                    let a = o.parse(e, this);
                    if (!a) return null;
                    if (this.expectedType) {
                        const s = this.expectedType,
                            l = a.type;
                        if ((s.kind === "string" || s.kind === "number" || s.kind === "boolean" || s.kind === "object" || s.kind === "array") && l.kind === "value") a = n(a, s, t.typeAnnotation || "assert");
                        else if ((s.kind === "color" || s.kind === "formatted" || s.kind === "resolvedImage") && (l.kind === "value" || l.kind === "string")) a = n(a, s, t.typeAnnotation || "coerce");
                        else if (this.checkSubtype(s, l)) return null
                    }
                    if (!(a instanceof at) && a.type.kind !== "resolvedImage" && Zt(a)) {
                        const s = new en;
                        try {
                            a = new at(a.type, a.evaluate(s))
                        } catch (l) {
                            return this.error(l.message), null
                        }
                    }
                    return a
                }
                return this.error(`Unknown expression "${i}". If you wanted a literal array, use ["literal", [...]].`, 0)
            } else return typeof e > "u" ? this.error("'undefined' value invalid. Use null instead.") : typeof e == "object" ? this.error('Bare objects invalid. Use ["literal", {...}] instead.') : this.error(`Expected an array, but found ${typeof e} instead.`)
        }
        concat(e, t, n) {
            const i = typeof e == "number" ? this.path.concat(e) : this.path,
                o = n ? this.scope.concat(n) : this.scope;
            return new Gt(this.registry, i, t || null, o, this.errors)
        }
        error(e, ...t) {
            const n = `${this.key}${t.map(i=>`[${i}]`).join("")}`;
            this.errors.push(new he(n, e))
        }
        checkSubtype(e, t) {
            const n = Ve(e, t);
            return n && this.error(n), n
        }
    }
    var un = Gt;

    function Zt(r) {
        if (r instanceof ln) return Zt(r.boundExpression);
        if (r instanceof Re && r.name === "error") return !1;
        if (r instanceof ut) return !1;
        if (r instanceof Bt) return !1;
        const e = r instanceof Se || r instanceof be;
        let t = !0;
        return r.eachChild(n => {
            e ? t = t && Zt(n) : t = t && n instanceof at
        }), t ? Wt(r) && Vt(r, ["zoom", "heatmap-density", "line-progress", "sky-radial-progress", "accumulated", "is-supported-script", "pitch", "distance-from-center"]) : !1
    }

    function dt(r, e) {
        const t = r.length - 1;
        let n = 0,
            i = t,
            o = 0,
            a, s;
        for (; n <= i;)
            if (o = Math.floor((n + i) / 2), a = r[o], s = r[o + 1], a <= e) {
                if (o === t || e < s) return o;
                n = o + 1
            } else if (a > e) i = o - 1;
        else throw new W("Input is not a number.");
        return 0
    }
    class Xt {
        constructor(e, t, n) {
            this.type = e, this.input = t, this.labels = [], this.outputs = [];
            for (const [i, o] of n) this.labels.push(i), this.outputs.push(o)
        }
        static parse(e, t) {
            if (e.length - 1 < 4) return t.error(`Expected at least 4 arguments, but found only ${e.length-1}.`);
            if ((e.length - 1) % 2 !== 0) return t.error("Expected an even number of arguments.");
            const n = t.parse(e[1], 1, y);
            if (!n) return null;
            const i = [];
            let o = null;
            t.expectedType && t.expectedType.kind !== "value" && (o = t.expectedType);
            for (let a = 1; a < e.length; a += 2) {
                const s = a === 1 ? -1 / 0 : e[a],
                    l = e[a + 1],
                    u = a,
                    c = a + 1;
                if (typeof s != "number") return t.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.', u);
                if (i.length && i[i.length - 1][0] >= s) return t.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.', u);
                const p = t.parse(l, c, o);
                if (!p) return null;
                o = o || p.type, i.push([s, p])
            }
            return new Xt(o, n, i)
        }
        evaluate(e) {
            const t = this.labels,
                n = this.outputs;
            if (t.length === 1) return n[0].evaluate(e);
            const i = this.input.evaluate(e);
            if (i <= t[0]) return n[0].evaluate(e);
            const o = t.length;
            if (i >= t[o - 1]) return n[o - 1].evaluate(e);
            const a = dt(t, i);
            return n[a].evaluate(e)
        }
        eachChild(e) {
            e(this.input);
            for (const t of this.outputs) e(t)
        }
        outputDefined() {
            return this.outputs.every(e => e.outputDefined())
        }
        serialize() {
            const e = ["step", this.input.serialize()];
            for (let t = 0; t < this.labels.length; t++) t > 0 && e.push(this.labels[t]), e.push(this.outputs[t].serialize());
            return e
        }
    }
    var cn = Xt,
        ta = dn;

    function dn(r, e, t, n) {
        this.cx = 3 * r, this.bx = 3 * (t - r) - this.cx, this.ax = 1 - this.cx - this.bx, this.cy = 3 * e, this.by = 3 * (n - e) - this.cy, this.ay = 1 - this.cy - this.by, this.p1x = r, this.p1y = e, this.p2x = t, this.p2y = n
    }
    dn.prototype = {
        sampleCurveX: function(r) {
            return ((this.ax * r + this.bx) * r + this.cx) * r
        },
        sampleCurveY: function(r) {
            return ((this.ay * r + this.by) * r + this.cy) * r
        },
        sampleCurveDerivativeX: function(r) {
            return (3 * this.ax * r + 2 * this.bx) * r + this.cx
        },
        solveCurveX: function(r, e) {
            if (e === void 0 && (e = 1e-6), r < 0) return 0;
            if (r > 1) return 1;
            for (var t = r, n = 0; n < 8; n++) {
                var i = this.sampleCurveX(t) - r;
                if (Math.abs(i) < e) return t;
                var o = this.sampleCurveDerivativeX(t);
                if (Math.abs(o) < 1e-6) break;
                t = t - i / o
            }
            var a = 0,
                s = 1;
            for (t = r, n = 0; n < 20 && (i = this.sampleCurveX(t), !(Math.abs(i - r) < e)); n++) r > i ? a = t : s = t, t = (s - a) * .5 + a;
            return t
        },
        solve: function(r, e) {
            return this.sampleCurveY(this.solveCurveX(r, e))
        }
    };

    function re(r, e, t) {
        return r * (1 - t) + e * t
    }

    function ra(r, e, t) {
        return new B(re(r.r, e.r, t), re(r.g, e.g, t), re(r.b, e.b, t), re(r.a, e.a, t))
    }

    function na(r, e, t) {
        return r.map((n, i) => re(n, e[i], t))
    }
    var pn = Object.freeze({
        __proto__: null,
        number: re,
        color: ra,
        array: na
    });
    const hn = .95047,
        fn = 1,
        mn = 1.08883,
        yn = 4 / 29,
        Oe = 6 / 29,
        gn = 3 * Oe * Oe,
        ia = Oe * Oe * Oe,
        oa = Math.PI / 180,
        aa = 180 / Math.PI;

    function Yt(r) {
        return r > ia ? Math.pow(r, 1 / 3) : r / gn + yn
    }

    function Kt(r) {
        return r > Oe ? r * r * r : gn * (r - yn)
    }

    function Qt(r) {
        return 255 * (r <= .0031308 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - .055)
    }

    function er(r) {
        return r /= 255, r <= .04045 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4)
    }

    function bn(r) {
        const e = er(r.r),
            t = er(r.g),
            n = er(r.b),
            i = Yt((.4124564 * e + .3575761 * t + .1804375 * n) / hn),
            o = Yt((.2126729 * e + .7151522 * t + .072175 * n) / fn),
            a = Yt((.0193339 * e + .119192 * t + .9503041 * n) / mn);
        return {
            l: 116 * o - 16,
            a: 500 * (i - o),
            b: 200 * (o - a),
            alpha: r.a
        }
    }

    function vn(r) {
        let e = (r.l + 16) / 116,
            t = isNaN(r.a) ? e : e + r.a / 500,
            n = isNaN(r.b) ? e : e - r.b / 200;
        return e = fn * Kt(e), t = hn * Kt(t), n = mn * Kt(n), new B(Qt(3.2404542 * t - 1.5371385 * e - .4985314 * n), Qt(-.969266 * t + 1.8760108 * e + .041556 * n), Qt(.0556434 * t - .2040259 * e + 1.0572252 * n), r.alpha)
    }

    function sa(r, e, t) {
        return {
            l: re(r.l, e.l, t),
            a: re(r.a, e.a, t),
            b: re(r.b, e.b, t),
            alpha: re(r.alpha, e.alpha, t)
        }
    }

    function la(r) {
        const {
            l: e,
            a: t,
            b: n
        } = bn(r), i = Math.atan2(n, t) * aa;
        return {
            h: i < 0 ? i + 360 : i,
            c: Math.sqrt(t * t + n * n),
            l: e,
            alpha: r.a
        }
    }

    function ua(r) {
        const e = r.h * oa,
            t = r.c,
            n = r.l;
        return vn({
            l: n,
            a: Math.cos(e) * t,
            b: Math.sin(e) * t,
            alpha: r.alpha
        })
    }

    function ca(r, e, t) {
        const n = e - r;
        return r + t * (n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n)
    }

    function da(r, e, t) {
        return {
            h: ca(r.h, e.h, t),
            c: re(r.c, e.c, t),
            l: re(r.l, e.l, t),
            alpha: re(r.alpha, e.alpha, t)
        }
    }
    const Ye = {
            forward: bn,
            reverse: vn,
            interpolate: sa
        },
        Ke = {
            forward: la,
            reverse: ua,
            interpolate: da
        };
    var wn = Object.freeze({
        __proto__: null,
        lab: Ye,
        hcl: Ke
    });
    class pt {
        constructor(e, t, n, i, o) {
            this.type = e, this.operator = t, this.interpolation = n, this.input = i, this.labels = [], this.outputs = [];
            for (const [a, s] of o) this.labels.push(a), this.outputs.push(s)
        }
        static interpolationFactor(e, t, n, i) {
            let o = 0;
            if (e.name === "exponential") o = tr(t, e.base, n, i);
            else if (e.name === "linear") o = tr(t, 1, n, i);
            else if (e.name === "cubic-bezier") {
                const a = e.controlPoints;
                o = new ta(a[0], a[1], a[2], a[3]).solve(tr(t, 1, n, i))
            }
            return o
        }
        static parse(e, t) {
            let [n, i, o, ...a] = e;
            if (!Array.isArray(i) || i.length === 0) return t.error("Expected an interpolation type expression.", 1);
            if (i[0] === "linear") i = {
                name: "linear"
            };
            else if (i[0] === "exponential") {
                const u = i[1];
                if (typeof u != "number") return t.error("Exponential interpolation requires a numeric base.", 1, 1);
                i = {
                    name: "exponential",
                    base: u
                }
            } else if (i[0] === "cubic-bezier") {
                const u = i.slice(1);
                if (u.length !== 4 || u.some(c => typeof c != "number" || c < 0 || c > 1)) return t.error("Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.", 1);
                i = {
                    name: "cubic-bezier",
                    controlPoints: u
                }
            } else return t.error(`Unknown interpolation type ${String(i[0])}`, 1, 0);
            if (e.length - 1 < 4) return t.error(`Expected at least 4 arguments, but found only ${e.length-1}.`);
            if ((e.length - 1) % 2 !== 0) return t.error("Expected an even number of arguments.");
            if (o = t.parse(o, 2, y), !o) return null;
            const s = [];
            let l = null;
            n === "interpolate-hcl" || n === "interpolate-lab" ? l = ye : t.expectedType && t.expectedType.kind !== "value" && (l = t.expectedType);
            for (let u = 0; u < a.length; u += 2) {
                const c = a[u],
                    p = a[u + 1],
                    d = u + 3,
                    m = u + 4;
                if (typeof c != "number") return t.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', d);
                if (s.length && s[s.length - 1][0] >= c) return t.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', d);
                const v = t.parse(p, m, l);
                if (!v) return null;
                l = l || v.type, s.push([c, v])
            }
            return l.kind !== "number" && l.kind !== "color" && !(l.kind === "array" && l.itemType.kind === "number" && typeof l.N == "number") ? t.error(`Type ${L(l)} is not interpolatable.`) : new pt(l, n, i, o, s)
        }
        evaluate(e) {
            const t = this.labels,
                n = this.outputs;
            if (t.length === 1) return n[0].evaluate(e);
            const i = this.input.evaluate(e);
            if (i <= t[0]) return n[0].evaluate(e);
            const o = t.length;
            if (i >= t[o - 1]) return n[o - 1].evaluate(e);
            const a = dt(t, i),
                s = t[a],
                l = t[a + 1],
                u = pt.interpolationFactor(this.interpolation, i, s, l),
                c = n[a].evaluate(e),
                p = n[a + 1].evaluate(e);
            return this.operator === "interpolate" ? pn[this.type.kind.toLowerCase()](c, p, u) : this.operator === "interpolate-hcl" ? Ke.reverse(Ke.interpolate(Ke.forward(c), Ke.forward(p), u)) : Ye.reverse(Ye.interpolate(Ye.forward(c), Ye.forward(p), u))
        }
        eachChild(e) {
            e(this.input);
            for (const t of this.outputs) e(t)
        }
        outputDefined() {
            return this.outputs.every(e => e.outputDefined())
        }
        serialize() {
            let e;
            this.interpolation.name === "linear" ? e = ["linear"] : this.interpolation.name === "exponential" ? this.interpolation.base === 1 ? e = ["linear"] : e = ["exponential", this.interpolation.base] : e = ["cubic-bezier"].concat(this.interpolation.controlPoints);
            const t = [this.operator, e, this.input.serialize()];
            for (let n = 0; n < this.labels.length; n++) t.push(this.labels[n], this.outputs[n].serialize());
            return t
        }
    }

    function tr(r, e, t, n) {
        const i = n - t,
            o = r - t;
        return i === 0 ? 0 : e === 1 ? o / i : (Math.pow(e, o) - 1) / (Math.pow(e, i) - 1)
    }
    var ve = pt;
    class ht {
        constructor(e, t) {
            this.type = e, this.args = t
        }
        static parse(e, t) {
            if (e.length < 2) return t.error("Expectected at least one argument.");
            let n = null;
            const i = t.expectedType;
            i && i.kind !== "value" && (n = i);
            const o = [];
            for (const s of e.slice(1)) {
                const l = t.parse(s, 1 + o.length, n, void 0, {
                    typeAnnotation: "omit"
                });
                if (!l) return null;
                n = n || l.type, o.push(l)
            }
            return i && o.some(s => Ve(i, s.type)) ? new ht(C, o) : new ht(n, o)
        }
        evaluate(e) {
            let t = null,
                n = 0,
                i;
            for (const o of this.args) {
                if (n++, t = o.evaluate(e), t && t instanceof ge && !t.available && (i || (i = t), t = null, n === this.args.length)) return i;
                if (t !== null) break
            }
            return t
        }
        eachChild(e) {
            this.args.forEach(e)
        }
        outputDefined() {
            return this.args.every(e => e.outputDefined())
        }
        serialize() {
            const e = ["coalesce"];
            return this.eachChild(t => {
                e.push(t.serialize())
            }), e
        }
    }
    var xn = ht;
    class rr {
        constructor(e, t) {
            this.type = t.type, this.bindings = [].concat(e), this.result = t
        }
        evaluate(e) {
            return this.result.evaluate(e)
        }
        eachChild(e) {
            for (const t of this.bindings) e(t[1]);
            e(this.result)
        }
        static parse(e, t) {
            if (e.length < 4) return t.error(`Expected at least 3 arguments, but found ${e.length-1} instead.`);
            const n = [];
            for (let o = 1; o < e.length - 1; o += 2) {
                const a = e[o];
                if (typeof a != "string") return t.error(`Expected string, but found ${typeof a} instead.`, o);
                if (/[^a-zA-Z0-9_]/.test(a)) return t.error("Variable names must contain only alphanumeric characters or '_'.", o);
                const s = t.parse(e[o + 1], o + 1);
                if (!s) return null;
                n.push([a, s])
            }
            const i = t.parse(e[e.length - 1], e.length - 1, t.expectedType, n);
            return i ? new rr(n, i) : null
        }
        outputDefined() {
            return this.result.outputDefined()
        }
        serialize() {
            const e = ["let"];
            for (const [t, n] of this.bindings) e.push(t, n.serialize());
            return e.push(this.result.serialize()), e
        }
    }
    var kn = rr;
    class nr {
        constructor(e, t, n) {
            this.type = e, this.index = t, this.input = n
        }
        static parse(e, t) {
            if (e.length !== 3) return t.error(`Expected 2 arguments, but found ${e.length-1} instead.`);
            const n = t.parse(e[1], 1, y),
                i = t.parse(e[2], 2, ae(t.expectedType || C));
            if (!n || !i) return null;
            const o = i.type;
            return new nr(o.itemType, n, i)
        }
        evaluate(e) {
            const t = this.index.evaluate(e),
                n = this.input.evaluate(e);
            if (t < 0) throw new W(`Array index out of bounds: ${t} < 0.`);
            if (t >= n.length) throw new W(`Array index out of bounds: ${t} > ${n.length-1}.`);
            if (t !== Math.floor(t)) throw new W(`Array index must be an integer, but found ${t} instead.`);
            return n[t]
        }
        eachChild(e) {
            e(this.index), e(this.input)
        }
        outputDefined() {
            return !1
        }
        serialize() {
            return ["at", this.index.serialize(), this.input.serialize()]
        }
    }
    var pa = nr;
    class ir {
        constructor(e, t) {
            this.type = z, this.needle = e, this.haystack = t
        }
        static parse(e, t) {
            if (e.length !== 3) return t.error(`Expected 2 arguments, but found ${e.length-1} instead.`);
            const n = t.parse(e[1], 1, C),
                i = t.parse(e[2], 2, C);
            return !n || !i ? null : It(n.type, [z, E, y, tt, C]) ? new ir(n, i) : t.error(`Expected first argument to be of type boolean, string, number or null, but found ${L(n.type)} instead`)
        }
        evaluate(e) {
            const t = this.needle.evaluate(e),
                n = this.haystack.evaluate(e);
            if (n == null) return !1;
            if (!He(t, ["boolean", "string", "number", "null"])) throw new W(`Expected first argument to be of type boolean, string, number or null, but found ${L(P(t))} instead.`);
            if (!He(n, ["string", "array"])) throw new W(`Expected second argument to be of type array or string, but found ${L(P(n))} instead.`);
            return n.indexOf(t) >= 0
        }
        eachChild(e) {
            e(this.needle), e(this.haystack)
        }
        outputDefined() {
            return !0
        }
        serialize() {
            return ["in", this.needle.serialize(), this.haystack.serialize()]
        }
    }
    var ha = ir;
    class ft {
        constructor(e, t, n) {
            this.type = y, this.needle = e, this.haystack = t, this.fromIndex = n
        }
        static parse(e, t) {
            if (e.length <= 2 || e.length >= 5) return t.error(`Expected 3 or 4 arguments, but found ${e.length-1} instead.`);
            const n = t.parse(e[1], 1, C),
                i = t.parse(e[2], 2, C);
            if (!n || !i) return null;
            if (!It(n.type, [z, E, y, tt, C])) return t.error(`Expected first argument to be of type boolean, string, number or null, but found ${L(n.type)} instead`);
            if (e.length === 4) {
                const o = t.parse(e[3], 3, y);
                return o ? new ft(n, i, o) : null
            } else return new ft(n, i)
        }
        evaluate(e) {
            const t = this.needle.evaluate(e),
                n = this.haystack.evaluate(e);
            if (!He(t, ["boolean", "string", "number", "null"])) throw new W(`Expected first argument to be of type boolean, string, number or null, but found ${L(P(t))} instead.`);
            if (!He(n, ["string", "array"])) throw new W(`Expected second argument to be of type array or string, but found ${L(P(n))} instead.`);
            if (this.fromIndex) {
                const i = this.fromIndex.evaluate(e);
                return n.indexOf(t, i)
            }
            return n.indexOf(t)
        }
        eachChild(e) {
            e(this.needle), e(this.haystack), this.fromIndex && e(this.fromIndex)
        }
        outputDefined() {
            return !1
        }
        serialize() {
            if (this.fromIndex != null && this.fromIndex !== void 0) {
                const e = this.fromIndex.serialize();
                return ["index-of", this.needle.serialize(), this.haystack.serialize(), e]
            }
            return ["index-of", this.needle.serialize(), this.haystack.serialize()]
        }
    }
    var fa = ft;
    class or {
        constructor(e, t, n, i, o, a) {
            this.inputType = e, this.type = t, this.input = n, this.cases = i, this.outputs = o, this.otherwise = a
        }
        static parse(e, t) {
            if (e.length < 5) return t.error(`Expected at least 4 arguments, but found only ${e.length-1}.`);
            if (e.length % 2 !== 1) return t.error("Expected an even number of arguments.");
            let n, i;
            t.expectedType && t.expectedType.kind !== "value" && (i = t.expectedType);
            const o = {},
                a = [];
            for (let u = 2; u < e.length - 1; u += 2) {
                let c = e[u];
                const p = e[u + 1];
                Array.isArray(c) || (c = [c]);
                const d = t.concat(u);
                if (c.length === 0) return d.error("Expected at least one branch label.");
                for (const v of c) {
                    if (typeof v != "number" && typeof v != "string") return d.error("Branch labels must be numbers or strings.");
                    if (typeof v == "number" && Math.abs(v) > Number.MAX_SAFE_INTEGER) return d.error(`Branch labels must be integers no larger than ${Number.MAX_SAFE_INTEGER}.`);
                    if (typeof v == "number" && Math.floor(v) !== v) return d.error("Numeric branch labels must be integer values.");
                    if (!n) n = P(v);
                    else if (d.checkSubtype(n, P(v))) return null;
                    if (typeof o[String(v)] < "u") return d.error("Branch labels must be unique.");
                    o[String(v)] = a.length
                }
                const m = t.parse(p, u, i);
                if (!m) return null;
                i = i || m.type, a.push(m)
            }
            const s = t.parse(e[1], 1, C);
            if (!s) return null;
            const l = t.parse(e[e.length - 1], e.length - 1, i);
            return !l || s.type.kind !== "value" && t.concat(1).checkSubtype(n, s.type) ? null : new or(n, i, s, o, a, l)
        }
        evaluate(e) {
            const t = this.input.evaluate(e);
            return (P(t) === this.inputType && this.outputs[this.cases[t]] || this.otherwise).evaluate(e)
        }
        eachChild(e) {
            e(this.input), this.outputs.forEach(e), e(this.otherwise)
        }
        outputDefined() {
            return this.outputs.every(e => e.outputDefined()) && this.otherwise.outputDefined()
        }
        serialize() {
            const e = ["match", this.input.serialize()],
                t = Object.keys(this.cases).sort(),
                n = [],
                i = {};
            for (const a of t) {
                const s = i[this.cases[a]];
                s === void 0 ? (i[this.cases[a]] = n.length, n.push([this.cases[a],
                    [a]
                ])) : n[s][1].push(a)
            }
            const o = a => this.inputType.kind === "number" ? Number(a) : a;
            for (const [a, s] of n) s.length === 1 ? e.push(o(s[0])) : e.push(s.map(o)), e.push(this.outputs[a].serialize());
            return e.push(this.otherwise.serialize()), e
        }
    }
    var ma = or;
    class ar {
        constructor(e, t, n) {
            this.type = e, this.branches = t, this.otherwise = n
        }
        static parse(e, t) {
            if (e.length < 4) return t.error(`Expected at least 3 arguments, but found only ${e.length-1}.`);
            if (e.length % 2 !== 0) return t.error("Expected an odd number of arguments.");
            let n;
            t.expectedType && t.expectedType.kind !== "value" && (n = t.expectedType);
            const i = [];
            for (let a = 1; a < e.length - 1; a += 2) {
                const s = t.parse(e[a], a, z);
                if (!s) return null;
                const l = t.parse(e[a + 1], a + 1, n);
                if (!l) return null;
                i.push([s, l]), n = n || l.type
            }
            const o = t.parse(e[e.length - 1], e.length - 1, n);
            return o ? new ar(n, i, o) : null
        }
        evaluate(e) {
            for (const [t, n] of this.branches)
                if (t.evaluate(e)) return n.evaluate(e);
            return this.otherwise.evaluate(e)
        }
        eachChild(e) {
            for (const [t, n] of this.branches) e(t), e(n);
            e(this.otherwise)
        }
        outputDefined() {
            return this.branches.every(([e, t]) => t.outputDefined()) && this.otherwise.outputDefined()
        }
        serialize() {
            const e = ["case"];
            return this.eachChild(t => {
                e.push(t.serialize())
            }), e
        }
    }
    var ya = ar;
    class mt {
        constructor(e, t, n, i) {
            this.type = e, this.input = t, this.beginIndex = n, this.endIndex = i
        }
        static parse(e, t) {
            if (e.length <= 2 || e.length >= 5) return t.error(`Expected 3 or 4 arguments, but found ${e.length-1} instead.`);
            const n = t.parse(e[1], 1, C),
                i = t.parse(e[2], 2, y);
            if (!n || !i) return null;
            if (!It(n.type, [ae(C), E, C])) return t.error(`Expected first argument to be of type array or string, but found ${L(n.type)} instead`);
            if (e.length === 4) {
                const o = t.parse(e[3], 3, y);
                return o ? new mt(n.type, n, i, o) : null
            } else return new mt(n.type, n, i)
        }
        evaluate(e) {
            const t = this.input.evaluate(e),
                n = this.beginIndex.evaluate(e);
            if (!He(t, ["string", "array"])) throw new W(`Expected first argument to be of type array or string, but found ${L(P(t))} instead.`);
            if (this.endIndex) {
                const i = this.endIndex.evaluate(e);
                return t.slice(n, i)
            }
            return t.slice(n)
        }
        eachChild(e) {
            e(this.input), e(this.beginIndex), this.endIndex && e(this.endIndex)
        }
        outputDefined() {
            return !1
        }
        serialize() {
            if (this.endIndex != null && this.endIndex !== void 0) {
                const e = this.endIndex.serialize();
                return ["slice", this.input.serialize(), this.beginIndex.serialize(), e]
            }
            return ["slice", this.input.serialize(), this.beginIndex.serialize()]
        }
    }
    var ga = mt;

    function jn(r, e) {
        return r === "==" || r === "!=" ? e.kind === "boolean" || e.kind === "string" || e.kind === "number" || e.kind === "null" || e.kind === "value" : e.kind === "string" || e.kind === "number" || e.kind === "value"
    }

    function ba(r, e, t) {
        return e === t
    }

    function va(r, e, t) {
        return e !== t
    }

    function wa(r, e, t) {
        return e < t
    }

    function xa(r, e, t) {
        return e > t
    }

    function ka(r, e, t) {
        return e <= t
    }

    function ja(r, e, t) {
        return e >= t
    }

    function Tn(r, e, t, n) {
        return n.compare(e, t) === 0
    }

    function Ta(r, e, t, n) {
        return !Tn(r, e, t, n)
    }

    function za(r, e, t, n) {
        return n.compare(e, t) < 0
    }

    function Ca(r, e, t, n) {
        return n.compare(e, t) > 0
    }

    function Ea(r, e, t, n) {
        return n.compare(e, t) <= 0
    }

    function Aa(r, e, t, n) {
        return n.compare(e, t) >= 0
    }

    function qe(r, e, t) {
        const n = r !== "==" && r !== "!=";
        return class ki {
            constructor(o, a, s) {
                this.type = z, this.lhs = o, this.rhs = a, this.collator = s, this.hasUntypedArgument = o.type.kind === "value" || a.type.kind === "value"
            }
            static parse(o, a) {
                if (o.length !== 3 && o.length !== 4) return a.error("Expected two or three arguments.");
                const s = o[0];
                let l = a.parse(o[1], 1, C);
                if (!l) return null;
                if (!jn(s, l.type)) return a.concat(1).error(`"${s}" comparisons are not supported for type '${L(l.type)}'.`);
                let u = a.parse(o[2], 2, C);
                if (!u) return null;
                if (!jn(s, u.type)) return a.concat(2).error(`"${s}" comparisons are not supported for type '${L(u.type)}'.`);
                if (l.type.kind !== u.type.kind && l.type.kind !== "value" && u.type.kind !== "value") return a.error(`Cannot compare types '${L(l.type)}' and '${L(u.type)}'.`);
                n && (l.type.kind === "value" && u.type.kind !== "value" ? l = new be(u.type, [l]) : l.type.kind !== "value" && u.type.kind === "value" && (u = new be(l.type, [u])));
                let c = null;
                if (o.length === 4) {
                    if (l.type.kind !== "string" && u.type.kind !== "string" && l.type.kind !== "value" && u.type.kind !== "value") return a.error("Cannot use collator to compare non-string types.");
                    if (c = a.parse(o[3], 3, rt), !c) return null
                }
                return new ki(l, u, c)
            }
            evaluate(o) {
                const a = this.lhs.evaluate(o),
                    s = this.rhs.evaluate(o);
                if (n && this.hasUntypedArgument) {
                    const l = P(a),
                        u = P(s);
                    if (l.kind !== u.kind || !(l.kind === "string" || l.kind === "number")) throw new W(`Expected arguments for "${r}" to be (string, string) or (number, number), but found (${l.kind}, ${u.kind}) instead.`)
                }
                if (this.collator && !n && this.hasUntypedArgument) {
                    const l = P(a),
                        u = P(s);
                    if (l.kind !== "string" || u.kind !== "string") return e(o, a, s)
                }
                return this.collator ? t(o, a, s, this.collator.evaluate(o)) : e(o, a, s)
            }
            eachChild(o) {
                o(this.lhs), o(this.rhs), this.collator && o(this.collator)
            }
            outputDefined() {
                return !0
            }
            serialize() {
                const o = [r];
                return this.eachChild(a => {
                    o.push(a.serialize())
                }), o
            }
        }
    }
    const _a = qe("==", ba, Tn),
        Sa = qe("!=", va, Ta),
        Ia = qe("<", wa, za),
        Ra = qe(">", xa, Ca),
        Oa = qe("<=", ka, Ea),
        qa = qe(">=", ja, Aa);
    class sr {
        constructor(e, t, n, i, o, a) {
            this.type = E, this.number = e, this.locale = t, this.currency = n, this.unit = i, this.minFractionDigits = o, this.maxFractionDigits = a
        }
        static parse(e, t) {
            if (e.length !== 3) return t.error("Expected two arguments.");
            const n = t.parse(e[1], 1, y);
            if (!n) return null;
            const i = e[2];
            if (typeof i != "object" || Array.isArray(i)) return t.error("NumberFormat options argument must be an object.");
            let o = null;
            if (i.locale && (o = t.parse(i.locale, 1, E), !o)) return null;
            let a = null;
            if (i.currency && (a = t.parse(i.currency, 1, E), !a)) return null;
            let s = null;
            if (i.unit && (s = t.parse(i.unit, 1, E), !s)) return null;
            let l = null;
            if (i["min-fraction-digits"] && (l = t.parse(i["min-fraction-digits"], 1, y), !l)) return null;
            let u = null;
            return i["max-fraction-digits"] && (u = t.parse(i["max-fraction-digits"], 1, y), !u) ? null : new sr(n, o, a, s, l, u)
        }
        evaluate(e) {
            return new Intl.NumberFormat(this.locale ? this.locale.evaluate(e) : [], {
                style: this.currency && "currency" || this.unit && "unit" || "decimal",
                currency: this.currency ? this.currency.evaluate(e) : void 0,
                unit: this.unit ? this.unit.evaluate(e) : void 0,
                minimumFractionDigits: this.minFractionDigits ? this.minFractionDigits.evaluate(e) : void 0,
                maximumFractionDigits: this.maxFractionDigits ? this.maxFractionDigits.evaluate(e) : void 0
            }).format(this.number.evaluate(e))
        }
        eachChild(e) {
            e(this.number), this.locale && e(this.locale), this.currency && e(this.currency), this.unit && e(this.unit), this.minFractionDigits && e(this.minFractionDigits), this.maxFractionDigits && e(this.maxFractionDigits)
        }
        outputDefined() {
            return !1
        }
        serialize() {
            const e = {};
            return this.locale && (e.locale = this.locale.serialize()), this.currency && (e.currency = this.currency.serialize()), this.unit && (e.unit = this.unit.serialize()), this.minFractionDigits && (e["min-fraction-digits"] = this.minFractionDigits.serialize()), this.maxFractionDigits && (e["max-fraction-digits"] = this.maxFractionDigits.serialize()), ["number-format", this.number.serialize(), e]
        }
    }
    class lr {
        constructor(e) {
            this.type = y, this.input = e
        }
        static parse(e, t) {
            if (e.length !== 2) return t.error(`Expected 1 argument, but found ${e.length-1} instead.`);
            const n = t.parse(e[1], 1);
            return n ? n.type.kind !== "array" && n.type.kind !== "string" && n.type.kind !== "value" ? t.error(`Expected argument of type string or array, but found ${L(n.type)} instead.`) : new lr(n) : null
        }
        evaluate(e) {
            const t = this.input.evaluate(e);
            if (typeof t == "string") return t.length;
            if (Array.isArray(t)) return t.length;
            throw new W(`Expected value to be of type string or array, but found ${L(P(t))} instead.`)
        }
        eachChild(e) {
            e(this.input)
        }
        outputDefined() {
            return !1
        }
        serialize() {
            const e = ["length"];
            return this.eachChild(t => {
                e.push(t.serialize())
            }), e
        }
    }
    var La = lr;
    const zn = {
        "==": _a,
        "!=": Sa,
        ">": Ra,
        "<": Ia,
        ">=": qa,
        "<=": Oa,
        array: be,
        at: pa,
        boolean: be,
        case: ya,
        coalesce: xn,
        collator: ut,
        format: st,
        image: lt,
        in: ha,
        "index-of": fa,
        interpolate: ve,
        "interpolate-hcl": ve,
        "interpolate-lab": ve,
        length: La,
        let: kn,
        literal: at,
        match: ma,
        number: be,
        "number-format": sr,
        object: be,
        slice: ga,
        step: cn,
        string: be,
        "to-boolean": Se,
        "to-color": Se,
        "to-number": Se,
        "to-string": Se,
        var: ln,
        within: Bt
    };

    function Cn(r, [e, t, n, i]) {
        e = e.evaluate(r), t = t.evaluate(r), n = n.evaluate(r);
        const o = i ? i.evaluate(r) : 1,
            a = Qr(e, t, n, o);
        if (a) throw new W(a);
        return new B(e / 255 * o, t / 255 * o, n / 255 * o, o)
    }

    function En(r, e) {
        return r in e
    }

    function ur(r, e) {
        const t = e[r];
        return typeof t > "u" ? null : t
    }

    function Na(r, e, t, n) {
        for (; t <= n;) {
            const i = t + n >> 1;
            if (e[i] === r) return !0;
            e[i] > r ? n = i - 1 : t = i + 1
        }
        return !1
    }

    function ze(r) {
        return {
            type: r
        }
    }
    Re.register(zn, {
        error: [Oo, [E], (r, [e]) => {
            throw new W(e.evaluate(r))
        }],
        typeof: [E, [C], (r, [e]) => L(P(e.evaluate(r)))],
        "to-rgba": [ae(y, 4), [ye], (r, [e]) => e.evaluate(r).toArray()],
        rgb: [ye, [y, y, y], Cn],
        rgba: [ye, [y, y, y, y], Cn],
        has: {
            type: z,
            overloads: [
                [
                    [E], (r, [e]) => En(e.evaluate(r), r.properties())
                ],
                [
                    [E, _e], (r, [e, t]) => En(e.evaluate(r), t.evaluate(r))
                ]
            ]
        },
        get: {
            type: C,
            overloads: [
                [
                    [E], (r, [e]) => ur(e.evaluate(r), r.properties())
                ],
                [
                    [E, _e], (r, [e, t]) => ur(e.evaluate(r), t.evaluate(r))
                ]
            ]
        },
        "feature-state": [C, [E], (r, [e]) => ur(e.evaluate(r), r.featureState || {})],
        properties: [_e, [], r => r.properties()],
        "geometry-type": [E, [], r => r.geometryType()],
        id: [C, [], r => r.id()],
        zoom: [y, [], r => r.globals.zoom],
        pitch: [y, [], r => r.globals.pitch || 0],
        "distance-from-center": [y, [], r => r.distanceFromCenter()],
        "heatmap-density": [y, [], r => r.globals.heatmapDensity || 0],
        "line-progress": [y, [], r => r.globals.lineProgress || 0],
        "sky-radial-progress": [y, [], r => r.globals.skyRadialProgress || 0],
        accumulated: [C, [], r => r.globals.accumulated === void 0 ? null : r.globals.accumulated],
        "+": [y, ze(y), (r, e) => {
            let t = 0;
            for (const n of e) t += n.evaluate(r);
            return t
        }],
        "*": [y, ze(y), (r, e) => {
            let t = 1;
            for (const n of e) t *= n.evaluate(r);
            return t
        }],
        "-": {
            type: y,
            overloads: [
                [
                    [y, y], (r, [e, t]) => e.evaluate(r) - t.evaluate(r)
                ],
                [
                    [y], (r, [e]) => -e.evaluate(r)
                ]
            ]
        },
        "/": [y, [y, y], (r, [e, t]) => e.evaluate(r) / t.evaluate(r)],
        "%": [y, [y, y], (r, [e, t]) => e.evaluate(r) % t.evaluate(r)],
        ln2: [y, [], () => Math.LN2],
        pi: [y, [], () => Math.PI],
        e: [y, [], () => Math.E],
        "^": [y, [y, y], (r, [e, t]) => Math.pow(e.evaluate(r), t.evaluate(r))],
        sqrt: [y, [y], (r, [e]) => Math.sqrt(e.evaluate(r))],
        log10: [y, [y], (r, [e]) => Math.log(e.evaluate(r)) / Math.LN10],
        ln: [y, [y], (r, [e]) => Math.log(e.evaluate(r))],
        log2: [y, [y], (r, [e]) => Math.log(e.evaluate(r)) / Math.LN2],
        sin: [y, [y], (r, [e]) => Math.sin(e.evaluate(r))],
        cos: [y, [y], (r, [e]) => Math.cos(e.evaluate(r))],
        tan: [y, [y], (r, [e]) => Math.tan(e.evaluate(r))],
        asin: [y, [y], (r, [e]) => Math.asin(e.evaluate(r))],
        acos: [y, [y], (r, [e]) => Math.acos(e.evaluate(r))],
        atan: [y, [y], (r, [e]) => Math.atan(e.evaluate(r))],
        min: [y, ze(y), (r, e) => Math.min(...e.map(t => t.evaluate(r)))],
        max: [y, ze(y), (r, e) => Math.max(...e.map(t => t.evaluate(r)))],
        abs: [y, [y], (r, [e]) => Math.abs(e.evaluate(r))],
        round: [y, [y], (r, [e]) => {
            const t = e.evaluate(r);
            return t < 0 ? -Math.round(-t) : Math.round(t)
        }],
        floor: [y, [y], (r, [e]) => Math.floor(e.evaluate(r))],
        ceil: [y, [y], (r, [e]) => Math.ceil(e.evaluate(r))],
        "filter-==": [z, [E, C], (r, [e, t]) => r.properties()[e.value] === t.value],
        "filter-id-==": [z, [C], (r, [e]) => r.id() === e.value],
        "filter-type-==": [z, [E], (r, [e]) => r.geometryType() === e.value],
        "filter-<": [z, [E, C], (r, [e, t]) => {
            const n = r.properties()[e.value],
                i = t.value;
            return typeof n == typeof i && n < i
        }],
        "filter-id-<": [z, [C], (r, [e]) => {
            const t = r.id(),
                n = e.value;
            return typeof t == typeof n && t < n
        }],
        "filter->": [z, [E, C], (r, [e, t]) => {
            const n = r.properties()[e.value],
                i = t.value;
            return typeof n == typeof i && n > i
        }],
        "filter-id->": [z, [C], (r, [e]) => {
            const t = r.id(),
                n = e.value;
            return typeof t == typeof n && t > n
        }],
        "filter-<=": [z, [E, C], (r, [e, t]) => {
            const n = r.properties()[e.value],
                i = t.value;
            return typeof n == typeof i && n <= i
        }],
        "filter-id-<=": [z, [C], (r, [e]) => {
            const t = r.id(),
                n = e.value;
            return typeof t == typeof n && t <= n
        }],
        "filter->=": [z, [E, C], (r, [e, t]) => {
            const n = r.properties()[e.value],
                i = t.value;
            return typeof n == typeof i && n >= i
        }],
        "filter-id->=": [z, [C], (r, [e]) => {
            const t = r.id(),
                n = e.value;
            return typeof t == typeof n && t >= n
        }],
        "filter-has": [z, [C], (r, [e]) => e.value in r.properties()],
        "filter-has-id": [z, [], r => r.id() !== null && r.id() !== void 0],
        "filter-type-in": [z, [ae(E)], (r, [e]) => e.value.indexOf(r.geometryType()) >= 0],
        "filter-id-in": [z, [ae(C)], (r, [e]) => e.value.indexOf(r.id()) >= 0],
        "filter-in-small": [z, [E, ae(C)], (r, [e, t]) => t.value.indexOf(r.properties()[e.value]) >= 0],
        "filter-in-large": [z, [E, ae(C)], (r, [e, t]) => Na(r.properties()[e.value], t.value, 0, t.value.length - 1)],
        all: {
            type: z,
            overloads: [
                [
                    [z, z], (r, [e, t]) => e.evaluate(r) && t.evaluate(r)
                ],
                [ze(z), (r, e) => {
                    for (const t of e)
                        if (!t.evaluate(r)) return !1;
                    return !0
                }]
            ]
        },
        any: {
            type: z,
            overloads: [
                [
                    [z, z], (r, [e, t]) => e.evaluate(r) || t.evaluate(r)
                ],
                [ze(z), (r, e) => {
                    for (const t of e)
                        if (t.evaluate(r)) return !0;
                    return !1
                }]
            ]
        },
        "!": [z, [z], (r, [e]) => !e.evaluate(r)],
        "is-supported-script": [z, [E], (r, [e]) => {
            const t = r.globals && r.globals.isSupportedScript;
            return t ? t(e.evaluate(r)) : !0
        }],
        upcase: [E, [E], (r, [e]) => e.evaluate(r).toUpperCase()],
        downcase: [E, [E], (r, [e]) => e.evaluate(r).toLowerCase()],
        concat: [E, ze(C), (r, e) => e.map(t => Ze(t.evaluate(r))).join("")],
        "resolved-locale": [E, [rt], (r, [e]) => e.evaluate(r).resolvedLocale()]
    });
    var An = zn;

    function cr(r) {
        return {
            result: "success",
            value: r
        }
    }

    function Le(r) {
        return {
            result: "error",
            value: r
        }
    }

    function Da(r) {
        return r["property-type"] === "data-driven"
    }

    function Pa(r) {
        return !!r.expression && r.expression.parameters.indexOf("zoom") > -1
    }

    function _n(r) {
        return !!r.expression && r.expression.interpolated
    }

    function dr(r) {
        return r instanceof Number ? "number" : r instanceof String ? "string" : r instanceof Boolean ? "boolean" : Array.isArray(r) ? "array" : r === null ? "null" : typeof r
    }

    function pr(r) {
        return typeof r == "object" && r !== null && !Array.isArray(r)
    }

    function Ma(r) {
        return r
    }

    function hr(r, e) {
        const t = e.type === "color",
            n = r.stops && typeof r.stops[0][0] == "object",
            i = n || r.property !== void 0,
            o = n || !i,
            a = r.type || (_n(e) ? "exponential" : "interval");
        if (t && (r = Zr({}, r), r.stops && (r.stops = r.stops.map(c => [c[0], B.parse(c[1])])), r.default ? r.default = B.parse(r.default) : r.default = B.parse(e.default)), r.colorSpace && r.colorSpace !== "rgb" && !wn[r.colorSpace]) throw new Error(`Unknown color space: ${r.colorSpace}`);
        let s, l, u;
        if (a === "exponential") s = Sn;
        else if (a === "interval") s = Fa;
        else if (a === "categorical") {
            s = $a, l = Object.create(null);
            for (const c of r.stops) l[c[0]] = c[1];
            u = typeof r.stops[0][0]
        } else if (a === "identity") s = Ua;
        else throw new Error(`Unknown function type "${a}"`);
        if (n) {
            const c = {},
                p = [];
            for (let v = 0; v < r.stops.length; v++) {
                const _ = r.stops[v],
                    j = _[0].zoom;
                c[j] === void 0 && (c[j] = {
                    zoom: j,
                    type: r.type,
                    property: r.property,
                    default: r.default,
                    stops: []
                }, p.push(j)), c[j].stops.push([_[0].value, _[1]])
            }
            const d = [];
            for (const v of p) d.push([c[v].zoom, hr(c[v], e)]);
            const m = {
                name: "linear"
            };
            return {
                kind: "composite",
                interpolationType: m,
                interpolationFactor: ve.interpolationFactor.bind(void 0, m),
                zoomStops: d.map(v => v[0]),
                evaluate({
                    zoom: v
                }, _) {
                    return Sn({
                        stops: d,
                        base: r.base
                    }, e, v).evaluate(v, _)
                }
            }
        } else if (o) {
            const c = a === "exponential" ? {
                name: "exponential",
                base: r.base !== void 0 ? r.base : 1
            } : null;
            return {
                kind: "camera",
                interpolationType: c,
                interpolationFactor: ve.interpolationFactor.bind(void 0, c),
                zoomStops: r.stops.map(p => p[0]),
                evaluate: ({
                    zoom: p
                }) => s(r, e, p, l, u)
            }
        } else return {
            kind: "source",
            evaluate(c, p) {
                const d = p && p.properties ? p.properties[r.property] : void 0;
                return d === void 0 ? Qe(r.default, e.default) : s(r, e, d, l, u)
            }
        }
    }

    function Qe(r, e, t) {
        if (r !== void 0) return r;
        if (e !== void 0) return e;
        if (t !== void 0) return t
    }

    function $a(r, e, t, n, i) {
        const o = typeof t === i ? n[t] : void 0;
        return Qe(o, r.default, e.default)
    }

    function Fa(r, e, t) {
        if (dr(t) !== "number") return Qe(r.default, e.default);
        const n = r.stops.length;
        if (n === 1 || t <= r.stops[0][0]) return r.stops[0][1];
        if (t >= r.stops[n - 1][0]) return r.stops[n - 1][1];
        const i = dt(r.stops.map(o => o[0]), t);
        return r.stops[i][1]
    }

    function Sn(r, e, t) {
        const n = r.base !== void 0 ? r.base : 1;
        if (dr(t) !== "number") return Qe(r.default, e.default);
        const i = r.stops.length;
        if (i === 1 || t <= r.stops[0][0]) return r.stops[0][1];
        if (t >= r.stops[i - 1][0]) return r.stops[i - 1][1];
        const o = dt(r.stops.map(c => c[0]), t),
            a = Ba(t, n, r.stops[o][0], r.stops[o + 1][0]),
            s = r.stops[o][1],
            l = r.stops[o + 1][1];
        let u = pn[e.type] || Ma;
        if (r.colorSpace && r.colorSpace !== "rgb") {
            const c = wn[r.colorSpace];
            u = (p, d) => c.reverse(c.interpolate(c.forward(p), c.forward(d), a))
        }
        return typeof s.evaluate == "function" ? {
            evaluate(...c) {
                const p = s.evaluate.apply(void 0, c),
                    d = l.evaluate.apply(void 0, c);
                if (!(p === void 0 || d === void 0)) return u(p, d, a)
            }
        } : u(s, l, a)
    }

    function Ua(r, e, t) {
        return e.type === "color" ? t = B.parse(t) : e.type === "formatted" ? t = ce.fromString(t.toString()) : e.type === "resolvedImage" ? t = ge.fromString(t.toString()) : dr(t) !== e.type && (e.type !== "enum" || !e.values[t]) && (t = void 0), Qe(t, r.default, e.default)
    }

    function Ba(r, e, t, n) {
        const i = n - t,
            o = r - t;
        return i === 0 ? 0 : e === 1 ? o / i : (Math.pow(e, o) - 1) / (Math.pow(e, i) - 1)
    }
    class In {
        constructor(e, t) {
            this.expression = e, this._warningHistory = {}, this._evaluator = new en, this._defaultValue = t ? Va(t) : null, this._enumValues = t && t.type === "enum" ? t.values : null
        }
        evaluateWithoutErrorHandling(e, t, n, i, o, a, s, l) {
            return this._evaluator.globals = e, this._evaluator.feature = t, this._evaluator.featureState = n, this._evaluator.canonical = i || null, this._evaluator.availableImages = o || null, this._evaluator.formattedSection = a, this._evaluator.featureTileCoord = s || null, this._evaluator.featureDistanceData = l || null, this.expression.evaluate(this._evaluator)
        }
        evaluate(e, t, n, i, o, a, s, l) {
            this._evaluator.globals = e, this._evaluator.feature = t || null, this._evaluator.featureState = n || null, this._evaluator.canonical = i || null, this._evaluator.availableImages = o || null, this._evaluator.formattedSection = a || null, this._evaluator.featureTileCoord = s || null, this._evaluator.featureDistanceData = l || null;
            try {
                const u = this.expression.evaluate(this._evaluator);
                if (u == null || typeof u == "number" && u !== u) return this._defaultValue;
                if (this._enumValues && !(u in this._enumValues)) throw new W(`Expected value to be one of ${Object.keys(this._enumValues).map(c=>JSON.stringify(c)).join(", ")}, but found ${JSON.stringify(u)} instead.`);
                return u
            } catch (u) {
                return this._warningHistory[u.message] || (this._warningHistory[u.message] = !0, typeof console < "u" && console.warn(u.message)), this._defaultValue
            }
        }
    }

    function Rn(r) {
        return Array.isArray(r) && r.length > 0 && typeof r[0] == "string" && r[0] in An
    }

    function On(r, e) {
        const t = new un(An, [], e ? Ja(e) : void 0),
            n = t.parse(r, void 0, void 0, void 0, e && e.type === "string" ? {
                typeAnnotation: "coerce"
            } : void 0);
        return n ? cr(new In(n, e)) : Le(t.errors)
    }
    class fr {
        constructor(e, t) {
            this.kind = e, this._styleExpression = t, this.isStateDependent = e !== "constant" && !Jt(t.expression)
        }
        evaluateWithoutErrorHandling(e, t, n, i, o, a) {
            return this._styleExpression.evaluateWithoutErrorHandling(e, t, n, i, o, a)
        }
        evaluate(e, t, n, i, o, a) {
            return this._styleExpression.evaluate(e, t, n, i, o, a)
        }
    }
    class mr {
        constructor(e, t, n, i) {
            this.kind = e, this.zoomStops = n, this._styleExpression = t, this.isStateDependent = e !== "camera" && !Jt(t.expression), this.interpolationType = i
        }
        evaluateWithoutErrorHandling(e, t, n, i, o, a) {
            return this._styleExpression.evaluateWithoutErrorHandling(e, t, n, i, o, a)
        }
        evaluate(e, t, n, i, o, a) {
            return this._styleExpression.evaluate(e, t, n, i, o, a)
        }
        interpolationFactor(e, t, n) {
            return this.interpolationType ? ve.interpolationFactor(this.interpolationType, e, t, n) : 0
        }
    }

    function qn(r, e) {
        if (r = On(r, e), r.result === "error") return r;
        const t = r.value.expression,
            n = Wt(t);
        if (!n && !Da(e)) return Le([new he("", "data expressions not supported")]);
        const i = Vt(t, ["zoom", "pitch", "distance-from-center"]);
        if (!i && !Pa(e)) return Le([new he("", "zoom expressions not supported")]);
        const o = gt(t);
        if (!o && !i) return Le([new he("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')]);
        if (o instanceof he) return Le([o]);
        if (o instanceof ve && !_n(e)) return Le([new he("", '"interpolate" expressions cannot be used with this property')]);
        if (!o) return cr(n ? new fr("constant", r.value) : new fr("source", r.value));
        const a = o instanceof ve ? o.interpolation : void 0;
        return cr(n ? new mr("camera", r.value, o.labels, a) : new mr("composite", r.value, o.labels, a))
    }
    class yt {
        constructor(e, t) {
            this._parameters = e, this._specification = t, Zr(this, hr(this._parameters, this._specification))
        }
        static deserialize(e) {
            return new yt(e._parameters, e._specification)
        }
        static serialize(e) {
            return {
                _parameters: e._parameters,
                _specification: e._specification
            }
        }
    }

    function Wa(r, e) {
        if (pr(r)) return new yt(r, e);
        if (Rn(r)) {
            const t = qn(r, e);
            if (t.result === "error") throw new Error(t.value.map(n => `${n.key}: ${n.message}`).join(", "));
            return t.value
        } else {
            let t = r;
            return typeof r == "string" && e.type === "color" && (t = B.parse(r)), {
                kind: "constant",
                evaluate: () => t
            }
        }
    }

    function gt(r) {
        let e = null;
        if (r instanceof kn) e = gt(r.result);
        else if (r instanceof xn) {
            for (const t of r.args)
                if (e = gt(t), e) break
        } else(r instanceof cn || r instanceof ve) && r.input instanceof Re && r.input.name === "zoom" && (e = r);
        return e instanceof he || r.eachChild(t => {
            const n = gt(t);
            n instanceof he ? e = n : !e && n ? e = new he("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.') : e && n && e !== n && (e = new he("", 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.'))
        }), e
    }

    function Ja(r) {
        const e = {
            color: ye,
            string: E,
            number: y,
            enum: E,
            boolean: z,
            formatted: nt,
            resolvedImage: Je
        };
        return r.type === "array" ? ae(e[r.value] || C, r.length) : e[r.type]
    }

    function Va(r) {
        return r.type === "color" && (pr(r.default) || Array.isArray(r.default)) ? new B(0, 0, 0, 0) : r.type === "color" ? B.parse(r.default) || null : r.default === void 0 ? null : r.default
    }

    function et(r) {
        return typeof r == "object" ? ["literal", r] : r
    }

    function Ha(r, e) {
        let t = r.stops;
        if (!t) return Ga(r, e);
        const n = t && typeof t[0][0] == "object",
            i = n || r.property !== void 0,
            o = n || !i;
        return t = t.map(a => !i && e.tokens && typeof a[1] == "string" ? [a[0], Ka(a[1])] : [a[0], et(a[1])]), n ? Za(r, e, t) : o ? Ya(r, e, t) : gr(r, e, t)
    }

    function Ga(r, e) {
        const t = ["get", r.property];
        if (r.default === void 0) return e.type === "string" ? ["string", t] : t;
        if (e.type === "enum") return ["match", t, Object.keys(e.values), t, r.default];
        {
            const n = [e.type === "color" ? "to-color" : e.type, t, et(r.default)];
            return e.type === "array" && n.splice(1, 0, e.value, e.length || null), n
        }
    }

    function yr(r) {
        switch (r.colorSpace) {
            case "hcl":
                return "interpolate-hcl";
            case "lab":
                return "interpolate-lab";
            default:
                return "interpolate"
        }
    }

    function Za(r, e, t) {
        const n = {},
            i = {},
            o = [];
        for (let s = 0; s < t.length; s++) {
            const l = t[s],
                u = l[0].zoom;
            n[u] === void 0 && (n[u] = {
                zoom: u,
                type: r.type,
                property: r.property,
                default: r.default
            }, i[u] = [], o.push(u)), i[u].push([l[0].value, l[1]])
        }
        if (vr({}, e) === "exponential") {
            const s = [yr(r), ["linear"],
                ["zoom"]
            ];
            for (const l of o) {
                const u = gr(n[l], e, i[l]);
                Ne(s, l, u, !1)
            }
            return s
        } else {
            const s = ["step", ["zoom"]];
            for (const l of o) {
                const u = gr(n[l], e, i[l]);
                Ne(s, l, u, !0)
            }
            return br(s), s
        }
    }

    function Xa(r, e) {
        if (r !== void 0) return r;
        if (e !== void 0) return e
    }

    function Ln(r, e) {
        const t = et(Xa(r.default, e.default));
        return t === void 0 && e.type === "resolvedImage" ? "" : t
    }

    function gr(r, e, t) {
        const n = vr(r, e),
            i = ["get", r.property];
        if (n === "categorical" && typeof t[0][0] == "boolean") {
            const o = ["case"];
            for (const a of t) o.push(["==", i, a[0]], a[1]);
            return o.push(Ln(r, e)), o
        } else if (n === "categorical") {
            const o = ["match", i];
            for (const a of t) Ne(o, a[0], a[1], !1);
            return o.push(Ln(r, e)), o
        } else if (n === "interval") {
            const o = ["step", ["number", i]];
            for (const a of t) Ne(o, a[0], a[1], !0);
            return br(o), r.default === void 0 ? o : ["case", ["==", ["typeof", i], "number"], o, et(r.default)]
        } else if (n === "exponential") {
            const o = r.base !== void 0 ? r.base : 1,
                a = [yr(r), o === 1 ? ["linear"] : ["exponential", o],
                    ["number", i]
                ];
            for (const s of t) Ne(a, s[0], s[1], !1);
            return r.default === void 0 ? a : ["case", ["==", ["typeof", i], "number"], a, et(r.default)]
        } else throw new Error(`Unknown property function type ${n}`)
    }

    function Ya(r, e, t, n = ["zoom"]) {
        const i = vr(r, e);
        let o, a = !1;
        if (i === "interval") o = ["step", n], a = !0;
        else if (i === "exponential") {
            const s = r.base !== void 0 ? r.base : 1;
            o = [yr(r), s === 1 ? ["linear"] : ["exponential", s], n]
        } else throw new Error(`Unknown zoom function type "${i}"`);
        for (const s of t) Ne(o, s[0], s[1], a);
        return br(o), o
    }

    function br(r) {
        r[0] === "step" && r.length === 3 && (r.push(0), r.push(r[3]))
    }

    function Ne(r, e, t, n) {
        r.length > 3 && e === r[r.length - 2] || (n && r.length === 2 || r.push(e), r.push(t))
    }

    function vr(r, e) {
        return r.type ? r.type : e.expression.interpolated ? "exponential" : "interval"
    }

    function Ka(r) {
        const e = ["concat"],
            t = /{([^{}]+)}/g;
        let n = 0;
        for (let i = t.exec(r); i !== null; i = t.exec(r)) {
            const o = r.slice(n, t.lastIndex - i[0].length);
            n = t.lastIndex, o.length > 0 && e.push(o), e.push(["get", i[1]])
        }
        if (e.length === 1) return r;
        if (n < r.length) e.push(r.slice(n));
        else if (e.length === 2) return ["to-string", e[1]];
        return e
    }

    function Nn(r) {
        if (r === !0 || r === !1) return !0;
        if (!Array.isArray(r) || r.length === 0) return !1;
        switch (r[0]) {
            case "has":
                return r.length >= 2 && r[1] !== "$id" && r[1] !== "$type";
            case "in":
                return r.length >= 3 && (typeof r[1] != "string" || Array.isArray(r[2]));
            case "!in":
            case "!has":
            case "none":
                return !1;
            case "==":
            case "!=":
            case ">":
            case ">=":
            case "<":
            case "<=":
                return r.length !== 3 || Array.isArray(r[1]) || Array.isArray(r[2]);
            case "any":
            case "all":
                for (const e of r.slice(1))
                    if (!Nn(e) && typeof e != "boolean") return !1;
                return !0;
            default:
                return !0
        }
    }

    function Qa(r) {
        throw new Error('Could not dynamically require "' + r + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')
    }
    var es = {};
    (function(r) {
        var e = function() {
            var t = function(j, g, f, b) {
                    for (f = f || {}, b = j.length; b--; f[j[b]] = g);
                    return f
                },
                n = [1, 12],
                i = [1, 13],
                o = [1, 9],
                a = [1, 10],
                s = [1, 11],
                l = [1, 14],
                u = [1, 15],
                c = [14, 18, 22, 24],
                p = [18, 22],
                d = [22, 24],
                m = {
                    trace: function() {},
                    yy: {},
                    symbols_: {
                        error: 2,
                        JSONString: 3,
                        STRING: 4,
                        JSONNumber: 5,
                        NUMBER: 6,
                        JSONNullLiteral: 7,
                        NULL: 8,
                        JSONBooleanLiteral: 9,
                        TRUE: 10,
                        FALSE: 11,
                        JSONText: 12,
                        JSONValue: 13,
                        EOF: 14,
                        JSONObject: 15,
                        JSONArray: 16,
                        "{": 17,
                        "}": 18,
                        JSONMemberList: 19,
                        JSONMember: 20,
                        ":": 21,
                        ",": 22,
                        "[": 23,
                        "]": 24,
                        JSONElementList: 25,
                        $accept: 0,
                        $end: 1
                    },
                    terminals_: {
                        2: "error",
                        4: "STRING",
                        6: "NUMBER",
                        8: "NULL",
                        10: "TRUE",
                        11: "FALSE",
                        14: "EOF",
                        17: "{",
                        18: "}",
                        21: ":",
                        22: ",",
                        23: "[",
                        24: "]"
                    },
                    productions_: [0, [3, 1],
                        [5, 1],
                        [7, 1],
                        [9, 1],
                        [9, 1],
                        [12, 2],
                        [13, 1],
                        [13, 1],
                        [13, 1],
                        [13, 1],
                        [13, 1],
                        [13, 1],
                        [15, 2],
                        [15, 3],
                        [20, 3],
                        [19, 1],
                        [19, 3],
                        [16, 2],
                        [16, 3],
                        [25, 1],
                        [25, 3]
                    ],
                    performAction: function(g, f, b, T, h, k, Q) {
                        var A = k.length - 1;
                        switch (h) {
                            case 1:
                                this.$ = new String(g.replace(/\\(\\|")/g, "$1").replace(/\\n/g, `
`).replace(/\\r/g, "\r").replace(/\\t/g, "	").replace(/\\v/g, "\v").replace(/\\f/g, "\f").replace(/\\b/g, "\b")), this.$.__line__ = this._$.first_line;
                                break;
                            case 2:
                                this.$ = new Number(g), this.$.__line__ = this._$.first_line;
                                break;
                            case 3:
                                this.$ = null;
                                break;
                            case 4:
                                this.$ = new Boolean(!0), this.$.__line__ = this._$.first_line;
                                break;
                            case 5:
                                this.$ = new Boolean(!1), this.$.__line__ = this._$.first_line;
                                break;
                            case 6:
                                return this.$ = k[A - 1];
                            case 13:
                                this.$ = {}, Object.defineProperty(this.$, "__line__", {
                                    value: this._$.first_line,
                                    enumerable: !1
                                });
                                break;
                            case 14:
                            case 19:
                                this.$ = k[A - 1], Object.defineProperty(this.$, "__line__", {
                                    value: this._$.first_line,
                                    enumerable: !1
                                });
                                break;
                            case 15:
                                this.$ = [k[A - 2], k[A]];
                                break;
                            case 16:
                                this.$ = {}, this.$[k[A][0]] = k[A][1];
                                break;
                            case 17:
                                this.$ = k[A - 2], k[A - 2][k[A][0]] = k[A][1];
                                break;
                            case 18:
                                this.$ = [], Object.defineProperty(this.$, "__line__", {
                                    value: this._$.first_line,
                                    enumerable: !1
                                });
                                break;
                            case 20:
                                this.$ = [k[A]];
                                break;
                            case 21:
                                this.$ = k[A - 2], k[A - 2].push(k[A]);
                                break
                        }
                    },
                    table: [{
                        3: 5,
                        4: n,
                        5: 6,
                        6: i,
                        7: 3,
                        8: o,
                        9: 4,
                        10: a,
                        11: s,
                        12: 1,
                        13: 2,
                        15: 7,
                        16: 8,
                        17: l,
                        23: u
                    }, {
                        1: [3]
                    }, {
                        14: [1, 16]
                    }, t(c, [2, 7]), t(c, [2, 8]), t(c, [2, 9]), t(c, [2, 10]), t(c, [2, 11]), t(c, [2, 12]), t(c, [2, 3]), t(c, [2, 4]), t(c, [2, 5]), t([14, 18, 21, 22, 24], [2, 1]), t(c, [2, 2]), {
                        3: 20,
                        4: n,
                        18: [1, 17],
                        19: 18,
                        20: 19
                    }, {
                        3: 5,
                        4: n,
                        5: 6,
                        6: i,
                        7: 3,
                        8: o,
                        9: 4,
                        10: a,
                        11: s,
                        13: 23,
                        15: 7,
                        16: 8,
                        17: l,
                        23: u,
                        24: [1, 21],
                        25: 22
                    }, {
                        1: [2, 6]
                    }, t(c, [2, 13]), {
                        18: [1, 24],
                        22: [1, 25]
                    }, t(p, [2, 16]), {
                        21: [1, 26]
                    }, t(c, [2, 18]), {
                        22: [1, 28],
                        24: [1, 27]
                    }, t(d, [2, 20]), t(c, [2, 14]), {
                        3: 20,
                        4: n,
                        20: 29
                    }, {
                        3: 5,
                        4: n,
                        5: 6,
                        6: i,
                        7: 3,
                        8: o,
                        9: 4,
                        10: a,
                        11: s,
                        13: 30,
                        15: 7,
                        16: 8,
                        17: l,
                        23: u
                    }, t(c, [2, 19]), {
                        3: 5,
                        4: n,
                        5: 6,
                        6: i,
                        7: 3,
                        8: o,
                        9: 4,
                        10: a,
                        11: s,
                        13: 31,
                        15: 7,
                        16: 8,
                        17: l,
                        23: u
                    }, t(p, [2, 17]), t(p, [2, 15]), t(d, [2, 21])],
                    defaultActions: {
                        16: [2, 6]
                    },
                    parseError: function(g, f) {
                        if (f.recoverable) this.trace(g);
                        else throw new Error(g)
                    },
                    parse: function(g) {
                        var f = this,
                            b = [0],
                            T = [null],
                            h = [],
                            k = this.table,
                            Q = "",
                            A = 0,
                            M = 0,
                            ee = 2,
                            ie = 1,
                            F = h.slice.call(arguments, 1),
                            I = Object.create(this.lexer),
                            N = {
                                yy: {}
                            };
                        for (var se in this.yy) Object.prototype.hasOwnProperty.call(this.yy, se) && (N.yy[se] = this.yy[se]);
                        I.setInput(g, N.yy), N.yy.lexer = I, N.yy.parser = this, typeof I.yylloc > "u" && (I.yylloc = {});
                        var Z = I.yylloc;
                        h.push(Z);
                        var Ue = I.options && I.options.ranges;
                        typeof N.yy.parseError == "function" ? this.parseError = N.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;

                        function Wr() {
                            var V;
                            return V = I.lex() || ie, typeof V != "number" && (V = f.symbols_[V] || V), V
                        }
                        for (var H, w, x, S, R = {}, O, q, D, U;;) {
                            if (w = b[b.length - 1], this.defaultActions[w] ? x = this.defaultActions[w] : ((H === null || typeof H > "u") && (H = Wr()), x = k[w] && k[w][H]), typeof x > "u" || !x.length || !x[0]) {
                                var X = "";
                                U = [];
                                for (O in k[w]) this.terminals_[O] && O > ee && U.push("'" + this.terminals_[O] + "'");
                                I.showPosition ? X = "Parse error on line " + (A + 1) + `:
` + I.showPosition() + `
Expecting ` + U.join(", ") + ", got '" + (this.terminals_[H] || H) + "'" : X = "Parse error on line " + (A + 1) + ": Unexpected " + (H == ie ? "end of input" : "'" + (this.terminals_[H] || H) + "'"), this.parseError(X, {
                                    text: I.match,
                                    token: this.terminals_[H] || H,
                                    line: I.yylineno,
                                    loc: Z,
                                    expected: U
                                })
                            }
                            if (x[0] instanceof Array && x.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + w + ", token: " + H);
                            switch (x[0]) {
                                case 1:
                                    b.push(H), T.push(I.yytext), h.push(I.yylloc), b.push(x[1]), H = null, M = I.yyleng, Q = I.yytext, A = I.yylineno, Z = I.yylloc;
                                    break;
                                case 2:
                                    if (q = this.productions_[x[1]][1], R.$ = T[T.length - q], R._$ = {
                                            first_line: h[h.length - (q || 1)].first_line,
                                            last_line: h[h.length - 1].last_line,
                                            first_column: h[h.length - (q || 1)].first_column,
                                            last_column: h[h.length - 1].last_column
                                        }, Ue && (R._$.range = [h[h.length - (q || 1)].range[0], h[h.length - 1].range[1]]), S = this.performAction.apply(R, [Q, M, A, N.yy, x[1], T, h].concat(F)), typeof S < "u") return S;
                                    q && (b = b.slice(0, -1 * q * 2), T = T.slice(0, -1 * q), h = h.slice(0, -1 * q)), b.push(this.productions_[x[1]][0]), T.push(R.$), h.push(R._$), D = k[b[b.length - 2]][b[b.length - 1]], b.push(D);
                                    break;
                                case 3:
                                    return !0
                            }
                        }
                        return !0
                    }
                },
                v = function() {
                    var j = {
                        EOF: 1,
                        parseError: function(f, b) {
                            if (this.yy.parser) this.yy.parser.parseError(f, b);
                            else throw new Error(f)
                        },
                        setInput: function(g, f) {
                            return this.yy = f || this.yy || {}, this._input = g, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                                first_line: 1,
                                first_column: 0,
                                last_line: 1,
                                last_column: 0
                            }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
                        },
                        input: function() {
                            var g = this._input[0];
                            this.yytext += g, this.yyleng++, this.offset++, this.match += g, this.matched += g;
                            var f = g.match(/(?:\r\n?|\n).*/g);
                            return f ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), g
                        },
                        unput: function(g) {
                            var f = g.length,
                                b = g.split(/(?:\r\n?|\n)/g);
                            this._input = g + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - f), this.offset -= f;
                            var T = this.match.split(/(?:\r\n?|\n)/g);
                            this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), b.length - 1 && (this.yylineno -= b.length - 1);
                            var h = this.yylloc.range;
                            return this.yylloc = {
                                first_line: this.yylloc.first_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.first_column,
                                last_column: b ? (b.length === T.length ? this.yylloc.first_column : 0) + T[T.length - b.length].length - b[0].length : this.yylloc.first_column - f
                            }, this.options.ranges && (this.yylloc.range = [h[0], h[0] + this.yyleng - f]), this.yyleng = this.yytext.length, this
                        },
                        more: function() {
                            return this._more = !0, this
                        },
                        reject: function() {
                            if (this.options.backtrack_lexer) this._backtrack = !0;
                            else return this.parseError("Lexical error on line " + (this.yylineno + 1) + `. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
` + this.showPosition(), {
                                text: "",
                                token: null,
                                line: this.yylineno
                            });
                            return this
                        },
                        less: function(g) {
                            this.unput(this.match.slice(g))
                        },
                        pastInput: function() {
                            var g = this.matched.substr(0, this.matched.length - this.match.length);
                            return (g.length > 20 ? "..." : "") + g.substr(-20).replace(/\n/g, "")
                        },
                        upcomingInput: function() {
                            var g = this.match;
                            return g.length < 20 && (g += this._input.substr(0, 20 - g.length)), (g.substr(0, 20) + (g.length > 20 ? "..." : "")).replace(/\n/g, "")
                        },
                        showPosition: function() {
                            var g = this.pastInput(),
                                f = new Array(g.length + 1).join("-");
                            return g + this.upcomingInput() + `
` + f + "^"
                        },
                        test_match: function(g, f) {
                            var b, T, h;
                            if (this.options.backtrack_lexer && (h = {
                                    yylineno: this.yylineno,
                                    yylloc: {
                                        first_line: this.yylloc.first_line,
                                        last_line: this.last_line,
                                        first_column: this.yylloc.first_column,
                                        last_column: this.yylloc.last_column
                                    },
                                    yytext: this.yytext,
                                    match: this.match,
                                    matches: this.matches,
                                    matched: this.matched,
                                    yyleng: this.yyleng,
                                    offset: this.offset,
                                    _more: this._more,
                                    _input: this._input,
                                    yy: this.yy,
                                    conditionStack: this.conditionStack.slice(0),
                                    done: this.done
                                }, this.options.ranges && (h.yylloc.range = this.yylloc.range.slice(0))), T = g[0].match(/(?:\r\n?|\n).*/g), T && (this.yylineno += T.length), this.yylloc = {
                                    first_line: this.yylloc.last_line,
                                    last_line: this.yylineno + 1,
                                    first_column: this.yylloc.last_column,
                                    last_column: T ? T[T.length - 1].length - T[T.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + g[0].length
                                }, this.yytext += g[0], this.match += g[0], this.matches = g, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(g[0].length), this.matched += g[0], b = this.performAction.call(this, this.yy, this, f, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), b) return b;
                            if (this._backtrack) {
                                for (var k in h) this[k] = h[k];
                                return !1
                            }
                            return !1
                        },
                        next: function() {
                            if (this.done) return this.EOF;
                            this._input || (this.done = !0);
                            var g, f, b, T;
                            this._more || (this.yytext = "", this.match = "");
                            for (var h = this._currentRules(), k = 0; k < h.length; k++)
                                if (b = this._input.match(this.rules[h[k]]), b && (!f || b[0].length > f[0].length)) {
                                    if (f = b, T = k, this.options.backtrack_lexer) {
                                        if (g = this.test_match(b, h[k]), g !== !1) return g;
                                        if (this._backtrack) {
                                            f = !1;
                                            continue
                                        } else return !1
                                    } else if (!this.options.flex) break
                                } return f ? (g = this.test_match(f, h[T]), g !== !1 ? g : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
                                text: "",
                                token: null,
                                line: this.yylineno
                            })
                        },
                        lex: function() {
                            var f = this.next();
                            return f || this.lex()
                        },
                        begin: function(f) {
                            this.conditionStack.push(f)
                        },
                        popState: function() {
                            var f = this.conditionStack.length - 1;
                            return f > 0 ? this.conditionStack.pop() : this.conditionStack[0]
                        },
                        _currentRules: function() {
                            return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules
                        },
                        topState: function(f) {
                            return f = this.conditionStack.length - 1 - Math.abs(f || 0), f >= 0 ? this.conditionStack[f] : "INITIAL"
                        },
                        pushState: function(f) {
                            this.begin(f)
                        },
                        stateStackSize: function() {
                            return this.conditionStack.length
                        },
                        options: {},
                        performAction: function(f, b, T, h) {
                            switch (T) {
                                case 0:
                                    break;
                                case 1:
                                    return 6;
                                case 2:
                                    return b.yytext = b.yytext.substr(1, b.yyleng - 2), 4;
                                case 3:
                                    return 17;
                                case 4:
                                    return 18;
                                case 5:
                                    return 23;
                                case 6:
                                    return 24;
                                case 7:
                                    return 22;
                                case 8:
                                    return 21;
                                case 9:
                                    return 10;
                                case 10:
                                    return 11;
                                case 11:
                                    return 8;
                                case 12:
                                    return 14;
                                case 13:
                                    return "INVALID"
                            }
                        },
                        rules: [/^(?:\s+)/, /^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/, /^(?:"(?:\\[\\"bfnrt/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/, /^(?:\{)/, /^(?:\})/, /^(?:\[)/, /^(?:\])/, /^(?:,)/, /^(?::)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:null\b)/, /^(?:$)/, /^(?:.)/],
                        conditions: {
                            INITIAL: {
                                rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                                inclusive: !0
                            }
                        }
                    };
                    return j
                }();
            m.lexer = v;

            function _() {
                this.yy = {}
            }
            return _.prototype = m, m.Parser = _, new _
        }();
        typeof Qa < "u" && (r.parser = e, r.Parser = e.Parser, r.parse = function() {
            return e.parse.apply(e, arguments)
        })
    })(es);
    const ts = {
            StyleExpression: In,
            isExpression: Rn,
            isExpressionFilter: Nn,
            createExpression: On,
            createPropertyExpression: qn,
            normalizePropertyExpression: Wa,
            ZoomConstantExpression: fr,
            ZoomDependentExpression: mr,
            StylePropertyFunction: yt
        },
        rs = {
            convertFunction: Ha,
            createFunction: hr,
            isFunction: pr
        };

    function ns(r) {
        var e = r.expr,
            t = r.layer,
            n = Math.min(e(t, "paint", "circle-radius"), 8),
            i = Math.min(e(t, "paint", "circle-stroke-width"), 4),
            o = e(t, "paint", "circle-color"),
            a = e(t, "paint", "circle-opacity"),
            s = e(t, "paint", "circle-stroke-color"),
            l = e(t, "paint", "circle-stroke-opacity"),
            u = n - i / 2;
        return {
            element: "svg",
            attributes: {
                viewBox: "0 0 20 20",
                xmlns: "http://www.w3.org/2000/svg",
                style: {
                    filter: "blur(" + e(t, "paint", "circle-blur") * u + "px)"
                }
            },
            children: [{
                element: "circle",
                attributes: {
                    key: "l1",
                    cx: 10,
                    cy: 10,
                    fill: o,
                    opacity: a,
                    r: u
                }
            }, {
                element: "circle",
                attributes: {
                    key: "l2",
                    cx: 10,
                    cy: 10,
                    fill: "transparent",
                    opacity: l,
                    r: n,
                    "stroke-width": i,
                    stroke: s
                }
            }]
        }
    }

    function is(r) {
        var e = r.expr,
            t = r.layer;
        return {
            element: "div",
            attributes: {
                style: {
                    width: "100%",
                    height: "100%",
                    backgroundImage: "url(" + (0, r.image)(e(t, "paint", "fill-pattern")) + ")",
                    backgroundColor: e(t, "paint", "fill-color"),
                    opacity: e(t, "paint", "fill-opacity"),
                    backgroundSize: "66% 66%",
                    backgroundPosition: "center"
                }
            }
        }
    }

    function os(r) {
        var e = r.layer,
            t = r.expr,
            n = (0, r.image)(t(e, "paint", "line-pattern")),
            i = {
                stroke: n ? "url(#img1)" : t(e, "paint", "line-color"),
                strokeWidth: Math.max(2, Math.min(t(e, "paint", "line-width"), 8)),
                strokeOpacity: t(e, "paint", "line-opacity"),
                strokeDasharray: t(e, "paint", "line-dasharray")
            },
            o = i.strokeWidth,
            a = "stroke: " + i.stroke + ";";
        return i.strokeOpacity && (a += "stroke-opacity: " + i.strokeOpacity + ";"), i.strokeDasharray && (a += "stroke-dasharray: " + i.strokeDasharray + ";"), {
            element: "svg",
            attributes: {
                viewBox: "0 0 20 20",
                xmlns: "http://www.w3.org/2000/svg"
            },
            children: [{
                element: "defs",
                attributes: {
                    key: "defs"
                },
                children: [{
                    element: "pattern",
                    attributes: {
                        key: "pattern",
                        id: "img1",
                        x: 0,
                        y: 0,
                        width: i.strokeWidth,
                        height: i.strokeWidth,
                        patternUnits: "userSpaceOnUse",
                        patternTransform: "translate(" + -o / 2 + " " + -o / 2 + ") rotate(45)"
                    },
                    children: [{
                        element: "image",
                        attributes: {
                            key: "img",
                            xlinkHref: n,
                            x: 0,
                            y: 0,
                            width: i.strokeWidth,
                            height: i.strokeWidth
                        }
                    }]
                }]
            }, {
                element: "path",
                attributes: {
                    key: "path",
                    style: a,
                    d: "M0 20 L 20 0"
                }
            }]
        }
    }

    function as(r) {
        return function(s) {
            var l = s.image,
                u = (0, s.expr)(s.layer, "layout", "icon-image");
            if (!u) return null;
            var c = l(u);
            return c ? {
                element: "div",
                attributes: {
                    style: {
                        backgroundImage: "url(" + c + ")",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                        height: "100%"
                    }
                }
            } : null
        }(r) || (i = (t = (e = r).expr)(n = e.layer, "paint", "text-color"), o = t(n, "paint", "text-opacity"), {
            element: "svg",
            attributes: {
                viewBox: "0 0 20 20",
                xmlns: "http://www.w3.org/2000/svg"
            },
            children: [{
                element: "path",
                attributes: {
                    key: "l1",
                    d: a = "M 4,4 L 16,4 L 16,7 L 11.5 7 L 11.5 16 L 8.5 16 L 8.5 7 L 4 7 Z",
                    stroke: t(n, "paint", "text-halo-color"),
                    "stroke-width": 2 * t(n, "paint", "text-halo-width"),
                    fill: "transparent",
                    "stroke-linejoin": "round"
                }
            }, {
                element: "path",
                attributes: {
                    key: "l2",
                    d: a,
                    fill: "white"
                }
            }, {
                element: "path",
                attributes: {
                    key: "l3",
                    d: a,
                    fill: i,
                    opacity: o
                }
            }]
        });
        var e, t, n, i, o, a
    }
    var ss = [
        ["background"],
        ["circle"],
        ["fill-extrusion"],
        ["fill"],
        ["heatmap"],
        ["hillshade"],
        ["line"],
        ["raster"],
        ["icon", "symbol"],
        ["text", "symbol"]
    ];

    function ls(r) {
        var e, t = r.sprite,
            n = r.layer,
            i = {
                circle: ns,
                symbol: as,
                line: os,
                fill: is
            } [n.type],
            o = (e = r.zoom, function(a, s, l) {
                var u = function(v) {
                        var _ = ss.find(function(j) {
                            return v.startsWith(j[0])
                        });
                        return _ ? _[1] || _[0] : null
                    }(l),
                    c = yo[s + "_" + u][l];
                if (!a[s]) return c.default;
                var p = a[s][l];
                if (p === void 0) return c.default;
                if (typeof p == "object") {
                    var d;
                    if (Array.isArray(p)) {
                        if (c.type === "array") return p;
                        d = ts.createExpression(p).value
                    } else d = rs.createFunction(p, c);
                    if (!d.evaluate) return null;
                    var m = d.evaluate({
                        zoom: e
                    }, {});
                    return m ? m.name || m : null
                }
                return p
            });
        return i ? i({
            layer: n,
            expr: o,
            image: function(a) {
                if (t && t.json) {
                    var s = t.json[a];
                    if (s) return l = t.image, c = (u = s).x, p = u.y, d = u.width, m = u.height, (v = document.createElement("canvas")).width = 2 * d, v.height = 2 * m, v.getContext("2d").drawImage(l, 2 * c, 2 * p, 2 * d, 2 * m, 0, 0, 2 * d, 2 * m), v.toDataURL()
                }
                var l, u, c, p, d, m, v;
                return null
            }
        }) : null
    }

    function us(r) {
        return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r
    }
    var wr = {
            exports: {}
        },
        Dn = function(e, t) {
            return function() {
                for (var i = new Array(arguments.length), o = 0; o < i.length; o++) i[o] = arguments[o];
                return e.apply(t, i)
            }
        },
        cs = Dn,
        xr = Object.prototype.toString,
        kr = function(r) {
            return function(e) {
                var t = xr.call(e);
                return r[t] || (r[t] = t.slice(8, -1).toLowerCase())
            }
        }(Object.create(null));

    function Ce(r) {
        return r = r.toLowerCase(),
            function(t) {
                return kr(t) === r
            }
    }

    function jr(r) {
        return Array.isArray(r)
    }

    function bt(r) {
        return typeof r > "u"
    }

    function ds(r) {
        return r !== null && !bt(r) && r.constructor !== null && !bt(r.constructor) && typeof r.constructor.isBuffer == "function" && r.constructor.isBuffer(r)
    }
    var Pn = Ce("ArrayBuffer");

    function ps(r) {
        var e;
        return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(r) : e = r && r.buffer && Pn(r.buffer), e
    }

    function hs(r) {
        return typeof r == "string"
    }

    function fs(r) {
        return typeof r == "number"
    }

    function Mn(r) {
        return r !== null && typeof r == "object"
    }

    function vt(r) {
        if (kr(r) !== "object") return !1;
        var e = Object.getPrototypeOf(r);
        return e === null || e === Object.prototype
    }
    var ms = Ce("Date"),
        ys = Ce("File"),
        gs = Ce("Blob"),
        bs = Ce("FileList");

    function Tr(r) {
        return xr.call(r) === "[object Function]"
    }

    function vs(r) {
        return Mn(r) && Tr(r.pipe)
    }

    function ws(r) {
        var e = "[object FormData]";
        return r && (typeof FormData == "function" && r instanceof FormData || xr.call(r) === e || Tr(r.toString) && r.toString() === e)
    }
    var xs = Ce("URLSearchParams");

    function ks(r) {
        return r.trim ? r.trim() : r.replace(/^\s+|\s+$/g, "")
    }

    function js() {
        return typeof navigator < "u" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window < "u" && typeof document < "u"
    }

    function zr(r, e) {
        if (!(r === null || typeof r > "u"))
            if (typeof r != "object" && (r = [r]), jr(r))
                for (var t = 0, n = r.length; t < n; t++) e.call(null, r[t], t, r);
            else
                for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && e.call(null, r[i], i, r)
    }

    function Cr() {
        var r = {};

        function e(i, o) {
            vt(r[o]) && vt(i) ? r[o] = Cr(r[o], i) : vt(i) ? r[o] = Cr({}, i) : jr(i) ? r[o] = i.slice() : r[o] = i
        }
        for (var t = 0, n = arguments.length; t < n; t++) zr(arguments[t], e);
        return r
    }

    function Ts(r, e, t) {
        return zr(e, function(i, o) {
            t && typeof i == "function" ? r[o] = cs(i, t) : r[o] = i
        }), r
    }

    function zs(r) {
        return r.charCodeAt(0) === 65279 && (r = r.slice(1)), r
    }

    function Cs(r, e, t, n) {
        r.prototype = Object.create(e.prototype, n), r.prototype.constructor = r, t && Object.assign(r.prototype, t)
    }

    function Es(r, e, t) {
        var n, i, o, a = {};
        e = e || {};
        do {
            for (n = Object.getOwnPropertyNames(r), i = n.length; i-- > 0;) o = n[i], a[o] || (e[o] = r[o], a[o] = !0);
            r = Object.getPrototypeOf(r)
        } while (r && (!t || t(r, e)) && r !== Object.prototype);
        return e
    }

    function As(r, e, t) {
        r = String(r), (t === void 0 || t > r.length) && (t = r.length), t -= e.length;
        var n = r.indexOf(e, t);
        return n !== -1 && n === t
    }

    function _s(r) {
        if (!r) return null;
        var e = r.length;
        if (bt(e)) return null;
        for (var t = new Array(e); e-- > 0;) t[e] = r[e];
        return t
    }
    var Ss = function(r) {
            return function(e) {
                return r && e instanceof r
            }
        }(typeof Uint8Array < "u" && Object.getPrototypeOf(Uint8Array)),
        J = {
            isArray: jr,
            isArrayBuffer: Pn,
            isBuffer: ds,
            isFormData: ws,
            isArrayBufferView: ps,
            isString: hs,
            isNumber: fs,
            isObject: Mn,
            isPlainObject: vt,
            isUndefined: bt,
            isDate: ms,
            isFile: ys,
            isBlob: gs,
            isFunction: Tr,
            isStream: vs,
            isURLSearchParams: xs,
            isStandardBrowserEnv: js,
            forEach: zr,
            merge: Cr,
            extend: Ts,
            trim: ks,
            stripBOM: zs,
            inherits: Cs,
            toFlatObject: Es,
            kindOf: kr,
            kindOfTest: Ce,
            endsWith: As,
            toArray: _s,
            isTypedArray: Ss,
            isFileList: bs
        },
        De = J;

    function $n(r) {
        return encodeURIComponent(r).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
    }
    var Fn = function(e, t, n) {
            if (!t) return e;
            var i;
            if (n) i = n(t);
            else if (De.isURLSearchParams(t)) i = t.toString();
            else {
                var o = [];
                De.forEach(t, function(l, u) {
                    l === null || typeof l > "u" || (De.isArray(l) ? u = u + "[]" : l = [l], De.forEach(l, function(p) {
                        De.isDate(p) ? p = p.toISOString() : De.isObject(p) && (p = JSON.stringify(p)), o.push($n(u) + "=" + $n(p))
                    }))
                }), i = o.join("&")
            }
            if (i) {
                var a = e.indexOf("#");
                a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + i
            }
            return e
        },
        Is = J;

    function wt() {
        this.handlers = []
    }
    wt.prototype.use = function(e, t, n) {
        return this.handlers.push({
            fulfilled: e,
            rejected: t,
            synchronous: n ? n.synchronous : !1,
            runWhen: n ? n.runWhen : null
        }), this.handlers.length - 1
    }, wt.prototype.eject = function(e) {
        this.handlers[e] && (this.handlers[e] = null)
    }, wt.prototype.forEach = function(e) {
        Is.forEach(this.handlers, function(n) {
            n !== null && e(n)
        })
    };
    var Rs = wt,
        Os = J,
        qs = function(e, t) {
            Os.forEach(e, function(i, o) {
                o !== t && o.toUpperCase() === t.toUpperCase() && (e[t] = i, delete e[o])
            })
        },
        Un = J;

    function Pe(r, e, t, n, i) {
        Error.call(this), this.message = r, this.name = "AxiosError", e && (this.code = e), t && (this.config = t), n && (this.request = n), i && (this.response = i)
    }
    Un.inherits(Pe, Error, {
        toJSON: function() {
            return {
                message: this.message,
                name: this.name,
                description: this.description,
                number: this.number,
                fileName: this.fileName,
                lineNumber: this.lineNumber,
                columnNumber: this.columnNumber,
                stack: this.stack,
                config: this.config,
                code: this.code,
                status: this.response && this.response.status ? this.response.status : null
            }
        }
    });
    var Bn = Pe.prototype,
        Wn = {};
    ["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED"].forEach(function(r) {
        Wn[r] = {
            value: r
        }
    }), Object.defineProperties(Pe, Wn), Object.defineProperty(Bn, "isAxiosError", {
        value: !0
    }), Pe.from = function(r, e, t, n, i, o) {
        var a = Object.create(Bn);
        return Un.toFlatObject(r, a, function(l) {
            return l !== Error.prototype
        }), Pe.call(a, r.message, e, t, n, i), a.name = r.name, o && Object.assign(a, o), a
    };
    var Me = Pe,
        Jn = {
            silentJSONParsing: !0,
            forcedJSONParsing: !0,
            clarifyTimeoutError: !1
        },
        de = J;

    function Ls(r, e) {
        e = e || new FormData;
        var t = [];

        function n(o) {
            return o === null ? "" : de.isDate(o) ? o.toISOString() : de.isArrayBuffer(o) || de.isTypedArray(o) ? typeof Blob == "function" ? new Blob([o]) : Buffer.from(o) : o
        }

        function i(o, a) {
            if (de.isPlainObject(o) || de.isArray(o)) {
                if (t.indexOf(o) !== -1) throw Error("Circular reference detected in " + a);
                t.push(o), de.forEach(o, function(l, u) {
                    if (!de.isUndefined(l)) {
                        var c = a ? a + "." + u : u,
                            p;
                        if (l && !a && typeof l == "object") {
                            if (de.endsWith(u, "{}")) l = JSON.stringify(l);
                            else if (de.endsWith(u, "[]") && (p = de.toArray(l))) {
                                p.forEach(function(d) {
                                    !de.isUndefined(d) && e.append(c, n(d))
                                });
                                return
                            }
                        }
                        i(l, c)
                    }
                }), t.pop()
            } else e.append(a, n(o))
        }
        return i(r), e
    }
    var Vn = Ls,
        Er, Hn;

    function Ns() {
        if (Hn) return Er;
        Hn = 1;
        var r = Me;
        return Er = function(t, n, i) {
            var o = i.config.validateStatus;
            !i.status || !o || o(i.status) ? t(i) : n(new r("Request failed with status code " + i.status, [r.ERR_BAD_REQUEST, r.ERR_BAD_RESPONSE][Math.floor(i.status / 100) - 4], i.config, i.request, i))
        }, Er
    }
    var Ar, Gn;

    function Ds() {
        if (Gn) return Ar;
        Gn = 1;
        var r = J;
        return Ar = r.isStandardBrowserEnv() ? function() {
            return {
                write: function(n, i, o, a, s, l) {
                    var u = [];
                    u.push(n + "=" + encodeURIComponent(i)), r.isNumber(o) && u.push("expires=" + new Date(o).toGMTString()), r.isString(a) && u.push("path=" + a), r.isString(s) && u.push("domain=" + s), l === !0 && u.push("secure"), document.cookie = u.join("; ")
                },
                read: function(n) {
                    var i = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"));
                    return i ? decodeURIComponent(i[3]) : null
                },
                remove: function(n) {
                    this.write(n, "", Date.now() - 864e5)
                }
            }
        }() : function() {
            return {
                write: function() {},
                read: function() {
                    return null
                },
                remove: function() {}
            }
        }(), Ar
    }
    var Ps = function(e) {
            return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
        },
        Ms = function(e, t) {
            return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
        },
        $s = Ps,
        Fs = Ms,
        Zn = function(e, t) {
            return e && !$s(t) ? Fs(e, t) : t
        },
        _r, Xn;

    function Us() {
        if (Xn) return _r;
        Xn = 1;
        var r = J,
            e = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
        return _r = function(n) {
            var i = {},
                o, a, s;
            return n && r.forEach(n.split(`
`), function(u) {
                if (s = u.indexOf(":"), o = r.trim(u.substr(0, s)).toLowerCase(), a = r.trim(u.substr(s + 1)), o) {
                    if (i[o] && e.indexOf(o) >= 0) return;
                    o === "set-cookie" ? i[o] = (i[o] ? i[o] : []).concat([a]) : i[o] = i[o] ? i[o] + ", " + a : a
                }
            }), i
        }, _r
    }
    var Sr, Yn;

    function Bs() {
        if (Yn) return Sr;
        Yn = 1;
        var r = J;
        return Sr = r.isStandardBrowserEnv() ? function() {
            var t = /(msie|trident)/i.test(navigator.userAgent),
                n = document.createElement("a"),
                i;

            function o(a) {
                var s = a;
                return t && (n.setAttribute("href", s), s = n.href), n.setAttribute("href", s), {
                    href: n.href,
                    protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                    host: n.host,
                    search: n.search ? n.search.replace(/^\?/, "") : "",
                    hash: n.hash ? n.hash.replace(/^#/, "") : "",
                    hostname: n.hostname,
                    port: n.port,
                    pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
                }
            }
            return i = o(window.location.href),
                function(s) {
                    var l = r.isString(s) ? o(s) : s;
                    return l.protocol === i.protocol && l.host === i.host
                }
        }() : function() {
            return function() {
                return !0
            }
        }(), Sr
    }
    var Ir, Kn;

    function xt() {
        if (Kn) return Ir;
        Kn = 1;
        var r = Me,
            e = J;

        function t(n) {
            r.call(this, n ?? "canceled", r.ERR_CANCELED), this.name = "CanceledError"
        }
        return e.inherits(t, r, {
            __CANCEL__: !0
        }), Ir = t, Ir
    }
    var Rr, Qn;

    function Ws() {
        return Qn || (Qn = 1, Rr = function(e) {
            var t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
            return t && t[1] || ""
        }), Rr
    }
    var Or, ei;

    function ti() {
        if (ei) return Or;
        ei = 1;
        var r = J,
            e = Ns(),
            t = Ds(),
            n = Fn,
            i = Zn,
            o = Us(),
            a = Bs(),
            s = Jn,
            l = Me,
            u = xt(),
            c = Ws();
        return Or = function(d) {
            return new Promise(function(v, _) {
                var j = d.data,
                    g = d.headers,
                    f = d.responseType,
                    b;

                function T() {
                    d.cancelToken && d.cancelToken.unsubscribe(b), d.signal && d.signal.removeEventListener("abort", b)
                }
                r.isFormData(j) && r.isStandardBrowserEnv() && delete g["Content-Type"];
                var h = new XMLHttpRequest;
                if (d.auth) {
                    var k = d.auth.username || "",
                        Q = d.auth.password ? unescape(encodeURIComponent(d.auth.password)) : "";
                    g.Authorization = "Basic " + btoa(k + ":" + Q)
                }
                var A = i(d.baseURL, d.url);
                h.open(d.method.toUpperCase(), n(A, d.params, d.paramsSerializer), !0), h.timeout = d.timeout;

                function M() {
                    if (h) {
                        var F = "getAllResponseHeaders" in h ? o(h.getAllResponseHeaders()) : null,
                            I = !f || f === "text" || f === "json" ? h.responseText : h.response,
                            N = {
                                data: I,
                                status: h.status,
                                statusText: h.statusText,
                                headers: F,
                                config: d,
                                request: h
                            };
                        e(function(Z) {
                            v(Z), T()
                        }, function(Z) {
                            _(Z), T()
                        }, N), h = null
                    }
                }
                if ("onloadend" in h ? h.onloadend = M : h.onreadystatechange = function() {
                        !h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.indexOf("file:") === 0) || setTimeout(M)
                    }, h.onabort = function() {
                        h && (_(new l("Request aborted", l.ECONNABORTED, d, h)), h = null)
                    }, h.onerror = function() {
                        _(new l("Network Error", l.ERR_NETWORK, d, h, h)), h = null
                    }, h.ontimeout = function() {
                        var I = d.timeout ? "timeout of " + d.timeout + "ms exceeded" : "timeout exceeded",
                            N = d.transitional || s;
                        d.timeoutErrorMessage && (I = d.timeoutErrorMessage), _(new l(I, N.clarifyTimeoutError ? l.ETIMEDOUT : l.ECONNABORTED, d, h)), h = null
                    }, r.isStandardBrowserEnv()) {
                    var ee = (d.withCredentials || a(A)) && d.xsrfCookieName ? t.read(d.xsrfCookieName) : void 0;
                    ee && (g[d.xsrfHeaderName] = ee)
                }
                "setRequestHeader" in h && r.forEach(g, function(I, N) {
                    typeof j > "u" && N.toLowerCase() === "content-type" ? delete g[N] : h.setRequestHeader(N, I)
                }), r.isUndefined(d.withCredentials) || (h.withCredentials = !!d.withCredentials), f && f !== "json" && (h.responseType = d.responseType), typeof d.onDownloadProgress == "function" && h.addEventListener("progress", d.onDownloadProgress), typeof d.onUploadProgress == "function" && h.upload && h.upload.addEventListener("progress", d.onUploadProgress), (d.cancelToken || d.signal) && (b = function(F) {
                    h && (_(!F || F && F.type ? new u : F), h.abort(), h = null)
                }, d.cancelToken && d.cancelToken.subscribe(b), d.signal && (d.signal.aborted ? b() : d.signal.addEventListener("abort", b))), j || (j = null);
                var ie = c(A);
                if (ie && ["http", "https", "file"].indexOf(ie) === -1) {
                    _(new l("Unsupported protocol " + ie + ":", l.ERR_BAD_REQUEST, d));
                    return
                }
                h.send(j)
            })
        }, Or
    }
    var qr, ri;

    function Js() {
        return ri || (ri = 1, qr = null), qr
    }
    var $ = J,
        ni = qs,
        ii = Me,
        Vs = Jn,
        Hs = Vn,
        Gs = {
            "Content-Type": "application/x-www-form-urlencoded"
        };

    function oi(r, e) {
        !$.isUndefined(r) && $.isUndefined(r["Content-Type"]) && (r["Content-Type"] = e)
    }

    function Zs() {
        var r;
        return (typeof XMLHttpRequest < "u" || typeof process < "u" && Object.prototype.toString.call(process) === "[object process]") && (r = ti()), r
    }

    function Xs(r, e, t) {
        if ($.isString(r)) try {
            return (e || JSON.parse)(r), $.trim(r)
        } catch (n) {
            if (n.name !== "SyntaxError") throw n
        }
        return (t || JSON.stringify)(r)
    }
    var kt = {
        transitional: Vs,
        adapter: Zs(),
        transformRequest: [function(e, t) {
            if (ni(t, "Accept"), ni(t, "Content-Type"), $.isFormData(e) || $.isArrayBuffer(e) || $.isBuffer(e) || $.isStream(e) || $.isFile(e) || $.isBlob(e)) return e;
            if ($.isArrayBufferView(e)) return e.buffer;
            if ($.isURLSearchParams(e)) return oi(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString();
            var n = $.isObject(e),
                i = t && t["Content-Type"],
                o;
            if ((o = $.isFileList(e)) || n && i === "multipart/form-data") {
                var a = this.env && this.env.FormData;
                return Hs(o ? {
                    "files[]": e
                } : e, a && new a)
            } else if (n || i === "application/json") return oi(t, "application/json"), Xs(e);
            return e
        }],
        transformResponse: [function(e) {
            var t = this.transitional || kt.transitional,
                n = t && t.silentJSONParsing,
                i = t && t.forcedJSONParsing,
                o = !n && this.responseType === "json";
            if (o || i && $.isString(e) && e.length) try {
                return JSON.parse(e)
            } catch (a) {
                if (o) throw a.name === "SyntaxError" ? ii.from(a, ii.ERR_BAD_RESPONSE, this, null, this.response) : a
            }
            return e
        }],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {
            FormData: Js()
        },
        validateStatus: function(e) {
            return e >= 200 && e < 300
        },
        headers: {
            common: {
                Accept: "application/json, text/plain, */*"
            }
        }
    };
    $.forEach(["delete", "get", "head"], function(e) {
        kt.headers[e] = {}
    }), $.forEach(["post", "put", "patch"], function(e) {
        kt.headers[e] = $.merge(Gs)
    });
    var Lr = kt,
        Ys = J,
        Ks = Lr,
        Qs = function(e, t, n) {
            var i = this || Ks;
            return Ys.forEach(n, function(a) {
                e = a.call(i, e, t)
            }), e
        },
        Nr, ai;

    function si() {
        return ai || (ai = 1, Nr = function(e) {
            return !!(e && e.__CANCEL__)
        }), Nr
    }
    var li = J,
        Dr = Qs,
        el = si(),
        tl = Lr,
        rl = xt();

    function Pr(r) {
        if (r.cancelToken && r.cancelToken.throwIfRequested(), r.signal && r.signal.aborted) throw new rl
    }
    var nl = function(e) {
            Pr(e), e.headers = e.headers || {}, e.data = Dr.call(e, e.data, e.headers, e.transformRequest), e.headers = li.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), li.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function(i) {
                delete e.headers[i]
            });
            var t = e.adapter || tl.adapter;
            return t(e).then(function(i) {
                return Pr(e), i.data = Dr.call(e, i.data, i.headers, e.transformResponse), i
            }, function(i) {
                return el(i) || (Pr(e), i && i.response && (i.response.data = Dr.call(e, i.response.data, i.response.headers, e.transformResponse))), Promise.reject(i)
            })
        },
        ne = J,
        ui = function(e, t) {
            t = t || {};
            var n = {};

            function i(c, p) {
                return ne.isPlainObject(c) && ne.isPlainObject(p) ? ne.merge(c, p) : ne.isPlainObject(p) ? ne.merge({}, p) : ne.isArray(p) ? p.slice() : p
            }

            function o(c) {
                if (ne.isUndefined(t[c])) {
                    if (!ne.isUndefined(e[c])) return i(void 0, e[c])
                } else return i(e[c], t[c])
            }

            function a(c) {
                if (!ne.isUndefined(t[c])) return i(void 0, t[c])
            }

            function s(c) {
                if (ne.isUndefined(t[c])) {
                    if (!ne.isUndefined(e[c])) return i(void 0, e[c])
                } else return i(void 0, t[c])
            }

            function l(c) {
                if (c in t) return i(e[c], t[c]);
                if (c in e) return i(void 0, e[c])
            }
            var u = {
                url: a,
                method: a,
                data: a,
                baseURL: s,
                transformRequest: s,
                transformResponse: s,
                paramsSerializer: s,
                timeout: s,
                timeoutMessage: s,
                withCredentials: s,
                adapter: s,
                responseType: s,
                xsrfCookieName: s,
                xsrfHeaderName: s,
                onUploadProgress: s,
                onDownloadProgress: s,
                decompress: s,
                maxContentLength: s,
                maxBodyLength: s,
                beforeRedirect: s,
                transport: s,
                httpAgent: s,
                httpsAgent: s,
                cancelToken: s,
                socketPath: s,
                responseEncoding: s,
                validateStatus: l
            };
            return ne.forEach(Object.keys(e).concat(Object.keys(t)), function(p) {
                var d = u[p] || o,
                    m = d(p);
                ne.isUndefined(m) && d !== l || (n[p] = m)
            }), n
        },
        Mr, ci;

    function di() {
        return ci || (ci = 1, Mr = {
            version: "0.27.2"
        }), Mr
    }
    var il = di().version,
        ke = Me,
        $r = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(r, e) {
        $r[r] = function(n) {
            return typeof n === r || "a" + (e < 1 ? "n " : " ") + r
        }
    });
    var pi = {};
    $r.transitional = function(e, t, n) {
        function i(o, a) {
            return "[Axios v" + il + "] Transitional option '" + o + "'" + a + (n ? ". " + n : "")
        }
        return function(o, a, s) {
            if (e === !1) throw new ke(i(a, " has been removed" + (t ? " in " + t : "")), ke.ERR_DEPRECATED);
            return t && !pi[a] && (pi[a] = !0, console.warn(i(a, " has been deprecated since v" + t + " and will be removed in the near future"))), e ? e(o, a, s) : !0
        }
    };

    function ol(r, e, t) {
        if (typeof r != "object") throw new ke("options must be an object", ke.ERR_BAD_OPTION_VALUE);
        for (var n = Object.keys(r), i = n.length; i-- > 0;) {
            var o = n[i],
                a = e[o];
            if (a) {
                var s = r[o],
                    l = s === void 0 || a(s, o, r);
                if (l !== !0) throw new ke("option " + o + " must be " + l, ke.ERR_BAD_OPTION_VALUE);
                continue
            }
            if (t !== !0) throw new ke("Unknown option " + o, ke.ERR_BAD_OPTION)
        }
    }
    var al = {
            assertOptions: ol,
            validators: $r
        },
        hi = J,
        sl = Fn,
        fi = Rs,
        mi = nl,
        jt = ui,
        ll = Zn,
        yi = al,
        $e = yi.validators;

    function Fe(r) {
        this.defaults = r, this.interceptors = {
            request: new fi,
            response: new fi
        }
    }
    Fe.prototype.request = function(e, t) {
        typeof e == "string" ? (t = t || {}, t.url = e) : t = e || {}, t = jt(this.defaults, t), t.method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
        var n = t.transitional;
        n !== void 0 && yi.assertOptions(n, {
            silentJSONParsing: $e.transitional($e.boolean),
            forcedJSONParsing: $e.transitional($e.boolean),
            clarifyTimeoutError: $e.transitional($e.boolean)
        }, !1);
        var i = [],
            o = !0;
        this.interceptors.request.forEach(function(m) {
            typeof m.runWhen == "function" && m.runWhen(t) === !1 || (o = o && m.synchronous, i.unshift(m.fulfilled, m.rejected))
        });
        var a = [];
        this.interceptors.response.forEach(function(m) {
            a.push(m.fulfilled, m.rejected)
        });
        var s;
        if (!o) {
            var l = [mi, void 0];
            for (Array.prototype.unshift.apply(l, i), l = l.concat(a), s = Promise.resolve(t); l.length;) s = s.then(l.shift(), l.shift());
            return s
        }
        for (var u = t; i.length;) {
            var c = i.shift(),
                p = i.shift();
            try {
                u = c(u)
            } catch (d) {
                p(d);
                break
            }
        }
        try {
            s = mi(u)
        } catch (d) {
            return Promise.reject(d)
        }
        for (; a.length;) s = s.then(a.shift(), a.shift());
        return s
    }, Fe.prototype.getUri = function(e) {
        e = jt(this.defaults, e);
        var t = ll(e.baseURL, e.url);
        return sl(t, e.params, e.paramsSerializer)
    }, hi.forEach(["delete", "get", "head", "options"], function(e) {
        Fe.prototype[e] = function(t, n) {
            return this.request(jt(n || {}, {
                method: e,
                url: t,
                data: (n || {}).data
            }))
        }
    }), hi.forEach(["post", "put", "patch"], function(e) {
        function t(n) {
            return function(o, a, s) {
                return this.request(jt(s || {}, {
                    method: e,
                    headers: n ? {
                        "Content-Type": "multipart/form-data"
                    } : {},
                    url: o,
                    data: a
                }))
            }
        }
        Fe.prototype[e] = t(), Fe.prototype[e + "Form"] = t(!0)
    });
    var ul = Fe,
        Fr, gi;

    function cl() {
        if (gi) return Fr;
        gi = 1;
        var r = xt();

        function e(t) {
            if (typeof t != "function") throw new TypeError("executor must be a function.");
            var n;
            this.promise = new Promise(function(a) {
                n = a
            });
            var i = this;
            this.promise.then(function(o) {
                if (i._listeners) {
                    var a, s = i._listeners.length;
                    for (a = 0; a < s; a++) i._listeners[a](o);
                    i._listeners = null
                }
            }), this.promise.then = function(o) {
                var a, s = new Promise(function(l) {
                    i.subscribe(l), a = l
                }).then(o);
                return s.cancel = function() {
                    i.unsubscribe(a)
                }, s
            }, t(function(a) {
                i.reason || (i.reason = new r(a), n(i.reason))
            })
        }
        return e.prototype.throwIfRequested = function() {
            if (this.reason) throw this.reason
        }, e.prototype.subscribe = function(n) {
            if (this.reason) {
                n(this.reason);
                return
            }
            this._listeners ? this._listeners.push(n) : this._listeners = [n]
        }, e.prototype.unsubscribe = function(n) {
            if (this._listeners) {
                var i = this._listeners.indexOf(n);
                i !== -1 && this._listeners.splice(i, 1)
            }
        }, e.source = function() {
            var n, i = new e(function(a) {
                n = a
            });
            return {
                token: i,
                cancel: n
            }
        }, Fr = e, Fr
    }
    var Ur, bi;

    function dl() {
        return bi || (bi = 1, Ur = function(e) {
            return function(n) {
                return e.apply(null, n)
            }
        }), Ur
    }
    var Br, vi;

    function pl() {
        if (vi) return Br;
        vi = 1;
        var r = J;
        return Br = function(t) {
            return r.isObject(t) && t.isAxiosError === !0
        }, Br
    }
    var wi = J,
        hl = Dn,
        Tt = ul,
        fl = ui,
        ml = Lr;

    function xi(r) {
        var e = new Tt(r),
            t = hl(Tt.prototype.request, e);
        return wi.extend(t, Tt.prototype, e), wi.extend(t, e), t.create = function(i) {
            return xi(fl(r, i))
        }, t
    }
    var K = xi(ml);
    K.Axios = Tt, K.CanceledError = xt(), K.CancelToken = cl(), K.isCancel = si(), K.VERSION = di().version, K.toFormData = Vn, K.AxiosError = Me, K.Cancel = K.CanceledError, K.all = function(e) {
        return Promise.all(e)
    }, K.spread = dl(), K.isAxiosError = pl(), wr.exports = K, wr.exports.default = K;
    var yl = wr.exports,
        gl = yl;
    const bl = us(gl);
    class vl {
        constructor(e, t) {
            ue(this, "controlContainer");
            ue(this, "map");
            ue(this, "legendContainer");
            ue(this, "legendButton");
            ue(this, "closeButton");
            ue(this, "legendTable");
            ue(this, "targets");
            ue(this, "uncheckedLayers", {});
            ue(this, "onlyRendered");
            ue(this, "options", {
                showDefault: !0,
                showCheckbox: !0,
                reverseOrder: !0,
                onlyRendered: !0,
                title: void 0
            });
            ue(this, "sprite", {
                image: HTMLImageElement,
                json: JSON
            });
            this.targets = e, t && (this.options = Object.assign(this.options, t)), this.onlyRendered = this.options.onlyRendered, this.onDocumentClick = this.onDocumentClick.bind(this)
        }
        getDefaultPosition() {
            return "top-right"
        }
        createLayerCheckbox(e) {
            var a;
            if (!this.options.showCheckbox) return;
            const t = (s, l) => {
                    var c, p;
                    l ? (this.uncheckedLayers[s] && delete this.uncheckedLayers[s], (c = this.map) == null || c.setLayoutProperty(s, "visibility", "visible")) : (this.uncheckedLayers[s] = s, (p = this.map) == null || p.setLayoutProperty(s, "visibility", "none"));
                    const u = document.getElementsByName(s);
                    for (const d in u) typeof u[d] != "number" && (u[d].checked = l)
                },
                n = document.createElement("TD");
            n.className = "legend-table-td";
            const i = document.createElement("input");
            i.setAttribute("type", "checkbox"), i.setAttribute("name", e.id), i.setAttribute("value", e.id);
            const o = (a = this.map) == null ? void 0 : a.getLayoutProperty(e.id, "visibility");
            if (!o) i.checked = !0;
            else {
                let s = !0;
                switch (o) {
                    case "none":
                        s = !1;
                        break;
                    case "visible":
                        s = !0, i.checked = !0;
                        break
                }
                t(e.id, s)
            }
            return i.addEventListener("click", function(s) {
                var c, p;
                const l = (c = s.target) == null ? void 0 : c.value,
                    u = (p = s.target) == null ? void 0 : p.checked;
                t(l, u)
            }), n.appendChild(i), n
        }
        getLayerLegend(e) {
            const t = this.map,
                n = t == null ? void 0 : t.getZoom(),
                i = this.sprite,
                o = ls({
                    sprite: i,
                    zoom: n,
                    layer: e
                }),
                a = document.createElement("TR"),
                s = this.createLayerCheckbox(e);
            s && a.appendChild(s);
            const l = document.createElement("TD");
            if (l.className = "legend-table-td", o)
                if (o.element === "div") {
                    if (o.attributes.style.backgroundImage && !["url(undefined)", "url(null)"].includes(o.attributes.style.backgroundImage)) {
                        const p = document.createElement("img");
                        p.src = o.attributes.style.backgroundImage.replace("url(", "").replace(")", ""), p.alt = e.id, p.style.cssText = "height: 17px;", l.appendChild(p)
                    }
                    l.style.backgroundColor = o.attributes.style.backgroundColor, l.style.backgroundPosition = o.attributes.style.backgroundPosition, l.style.backgroundSize = o.attributes.style.backgroundSize, l.style.backgroundRepeat = o.attributes.style.backgroundRepeat, l.style.opacity = o.attributes.style.opacity
                } else if (o.element === "svg") {
                const p = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                p.style.cssText = "height: 17px;", p.setAttributeNS(null, "version", "1.1"), Object.keys(o.attributes).forEach(m => {
                    p.setAttribute(m, o.attributes[m]);
                    const v = document.createElementNS("http://www.w3.org/2000/svg", "g");
                    o.children.forEach(_ => {
                        const j = document.createElementNS("http://www.w3.org/2000/svg", _.element);
                        Object.keys(_.attributes).forEach(g => {
                            j.setAttributeNS(null, g, _.attributes[g])
                        }), v.appendChild(j)
                    }), p.appendChild(v)
                });
                const d = document.createElement("label");
                d.textContent = this.targets && this.targets[e.id] ? this.targets[e.id] : e.id, l.appendChild(p)
            } else return;
            else {
                const p = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
                    d = document.createElementNS("http://www.w3.org/2000/svg", "path"),
                    m = document.createElementNS("http://www.w3.org/2000/svg", "path");
                p.setAttribute("fill", "none"), p.setAttribute("viewBox", "0 0 24 24"), p.setAttribute("stroke", "black"), p.classList.add("post-icon"), d.setAttribute("d", "M21,0H3A3,3,0,0,0,0,3V21a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V3A3,3,0,0,0,21,0ZM3,2H21a1,1,0,0,1,1,1V15.86L14.18,9.35a5.06,5.06,0,0,0-6.39-.06L2,13.92V3A1,1,0,0,1,3,2ZM21,22H3a1,1,0,0,1-1-1V16.48l7-5.63a3.06,3.06,0,0,1,3.86,0L22,18.47V21A1,1,0,0,1,21,22Z"), d.setAttribute("stroke-linecap", "round"), d.setAttribute("stroke-linejoin", "round"), d.setAttribute("stroke-width", "2"), m.setAttribute("d", "M18,9a3,3,0,1,0-3-3A3,3,0,0,0,18,9Zm0-4a1,1,0,1,1-1,1A1,1,0,0,1,18,5Z"), m.setAttribute("stroke-linecap", "round"), m.setAttribute("stroke-linejoin", "round"), m.setAttribute("stroke-width", "2"), p.appendChild(d), p.appendChild(m);
                const v = document.createElement("label");
                v.textContent = this.targets && this.targets[e.id] ? this.targets[e.id] : e.id, l.appendChild(p)
            }
            const u = document.createElement("TD");
            u.className = "legend-table-td";
            const c = document.createElement("label");
            return c.textContent = this.targets && this.targets[e.id] ? this.targets[e.id] : e.id, u.appendChild(c), a.appendChild(l), a.appendChild(u), a
        }
        updateLegendControl() {
            const e = this.map,
                t = {};
            if (e) {
                const i = e.queryRenderedFeatures();
                for (const o of i) t[o.layer.id] = o.layer
            }
            let n = e == null ? void 0 : e.getStyle().layers;
            if (n) {
                for (this.legendTable || (this.legendTable = document.createElement("TABLE"), this.legendTable.className = "legend-table", this.legendContainer.appendChild(this.legendTable)); this.legendTable.firstChild;) this.legendTable.removeChild(this.legendTable.firstChild);
                this.options.reverseOrder && (n = n.reverse()), n.forEach(i => {
                    if (t[i.id] && this.uncheckedLayers[i.id] ? delete this.uncheckedLayers[i.id] : this.uncheckedLayers[i.id] && (t[i.id] = i), this.targets === void 0 || this.targets && Object.keys(this.targets).length === 0 || this.targets && Object.keys(this.targets).map(o => o).includes(i.id)) {
                        if (this.onlyRendered && !t[i.id]) return;
                        const o = this.getLayerLegend(i);
                        if (!o) return;
                        this.legendTable.appendChild(o)
                    } else return
                })
            }
        }
        onAdd(e) {
            this.map = e, this.controlContainer = document.createElement("div"), this.controlContainer.classList.add("maplibregl-ctrl"), this.controlContainer.classList.add("maplibregl-ctrl-group"), this.legendContainer = document.createElement("div"), this.legendContainer.classList.add("maplibregl-legend-list"), this.legendButton = document.createElement("button"), this.legendButton.classList.add("maplibregl-ctrl-icon"), this.legendButton.classList.add("maplibregl-legend-switcher"), this.legendButton.addEventListener("click", () => {
                this.legendButton.style.display = "none", this.legendContainer.style.display = "block"
            }), document.addEventListener("click", this.onDocumentClick), this.controlContainer.appendChild(this.legendButton), this.controlContainer.appendChild(this.legendContainer), this.closeButton = document.createElement("button"), this.closeButton.textContent = "x", this.closeButton.classList.add("maplibregl-legend-close-button"), this.closeButton.addEventListener("click", () => {
                this.legendButton.style.display = "block", this.legendContainer.style.display = "none"
            }), this.legendContainer.appendChild(this.closeButton);
            const t = document.createElement("label");
            t.classList.add("maplibregl-legend-title-label"), t.textContent = this.options.title || "Legend", this.legendContainer.appendChild(t), this.legendContainer.appendChild(document.createElement("br"));
            const n = document.createElement("input");
            n.setAttribute("type", "checkbox");
            const i = `maplibregl-legend-onlyrendered-checkbox-${Math.random()*100}`;
            n.setAttribute("id", i), n.classList.add("maplibregl-legend-onlyRendered-checkbox"), n.checked = this.onlyRendered, n.addEventListener("click", this.handleClickOnlyRendered.bind(this)), this.legendContainer.appendChild(n);
            const o = document.createElement("label");
            o.classList.add("maplibregl-legend-onlyRendered-label"), o.textContent = "Only rendered", o.htmlFor = i, this.legendContainer.appendChild(o), this.legendContainer.appendChild(document.createElement("br")), this.map.on("moveend", () => {
                this.updateLegendControl()
            }), this.map.on("styledata", () => {
                this.updateLegendControl()
            });
            const a = async () => {
                if (e.loaded()) {
                    const l = e.getStyle().sprite;
                    l && await Promise.all([this.loadImage(`${l}@2x.png`), this.loadJson(`${l}.json`)]).then(([c, p]) => {
                        this.setSprite(c, p)
                    }).catch(c => console.error(c)), this.updateLegendControl(), e.off("idle", a)
                }
            };
            return this.map.on("idle", a), this.options && this.options.showDefault == !0 && (this.legendContainer.style.display = "block", this.legendButton.style.display = "none"), this.controlContainer
        }
        onRemove() {
            !this.controlContainer || !this.controlContainer.parentNode || !this.map || !this.legendButton || (this.legendButton.removeEventListener("click", this.onDocumentClick), this.controlContainer.parentNode.removeChild(this.controlContainer), document.removeEventListener("click", this.onDocumentClick), this.map = void 0)
        }
        redraw() {
            this.updateLegendControl()
        }
        onDocumentClick(e) {
            this.controlContainer && !this.controlContainer.contains(e.target) && this.legendContainer && this.legendButton && this.options && this.options.showDefault !== !0 && (this.legendContainer.style.display = "none", this.legendButton.style.display = "block")
        }
        handleClickOnlyRendered(e) {
            var n;
            const t = (n = e.target) == null ? void 0 : n.checked;
            this.onlyRendered = !!t, this.updateLegendControl()
        }
        setSprite(e, t) {
            this.sprite = {
                image: e,
                json: t
            }
        }
        loadImage(e) {
            let t = !1;
            const n = new Promise((i, o) => {
                const a = new Image;
                a.crossOrigin = "Anonymous", a.onload = () => {
                    t || i(a)
                }, a.onerror = s => {
                    t || o(s)
                }, a.src = e
            });
            return n.cancel = () => {
                t = !0
            }, n
        }
        loadJson(e) {
            return bl.get(e, {
                responseType: "json"
            }).then(t => t.data)
        }
    }
    oe.MaplibreLegendControl = vl, Object.defineProperty(oe, Symbol.toStringTag, {
        value: "Module"
    })
});
