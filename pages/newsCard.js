import React from "react";

const DataView = ({ title, description, url, urlToImage }) => {
  const fallBackImage = "https://res.cloudinary.com/teepublic/image/private/s--lJJYqwRw--/c_crop,x_10,y_10/c_fit,w_1109/c_crop,g_north_west,h_1260,w_1260,x_-76,y_-135/co_rgb:ffffff,e_colorize,u_Misc:One%20Pixel%20Gray/c_scale,g_north_west,h_1260,w_1260/fl_layer_apply,g_north_west,x_-76,y_-135/bo_0px_solid_white/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1606803363/production/designs/16724317_0.jpg";
  return (
    <div className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform mb-4 flex items-start">
      {/* Display the image */}
      <img
        src={urlToImage || fallBackImage}
        alt="Article Image"
        className="mr-4 rounded-md"
        onError={(e) => {
          e.target.src = fallBackImage;
        }}
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />
      <div>
        {/* Title */}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {/* Description */}
        <p className="text-gray-600 mb-2">{description}</p>
        {/* Read More link */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default DataView;
