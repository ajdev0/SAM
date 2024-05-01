/****
 * ENDPOINTS
 * 
3. Create segment
4. Get all segments
6. Add users to segment
7. Get segment by id
8. Update segment
*/

import axios from "axios";

// Create Audience  Segment
export const createSegment = async (req, res) => {
  const formData = req.body;
  const accessToken = req.headers["snap-access-token"];
  try {
    const data = {
      segments: [
        {
          name: formData.name,
          description: formData.description,
          source_type: "FIRST_PARTY",
          retention_in_days: formData.retention_in_days,
          ad_account_id: formData.ad_account_id,
        },
      ],
    };

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${process.env.SNAPCHAT_API}/adaccounts/${formData.ad_account_id}/segments`,
      data,
      config
    );
    // Send the response from Snapchat API back to the client
    res.send(response.data);
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error:", error.response.data);
    res.status(error.response.status).json({ message: error.response.data });
  }
};

// Get all segments
export const getAllSegments = async (req, res) => {
  const accountAdId = req.params.ad_account_id;
  const accessToken = req.headers["snap-access-token"];
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.get(
      `${process.env.SNAPCHAT_API}/adaccounts/${accountAdId}/segments`,
      config
    );

    // Send the response from Snapchat API back to the client
    res.send(response.data);
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error:", error.response.data);
    res.status(error.response.status).json({ message: error.response.data });
  }
};

//Get segment by id
export const getSegmentById = async (req, res) => {
  const segmentId = req.params.segment_id;
  const accessToken = req.headers["snap-access-token"];
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.get(
      `${process.env.SNAPCHAT_API}/segments/${segmentId}`,
      config
    );
    // Send the response from Snapchat API back to the client
    res.send(response.data);
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error:", error.response.data);
    res.status(error.response.status).json({ message: error.response.data });
  }
};

//update segment
export const updateSegment = async (req, res) => {
  const accountAdId = req.params.ad_account_id;
  const accessToken = req.headers["snap-access-token"];
  const formData = req.body;

  try {
    const data = {
      segments: [
        {
          id: formData.id,
          name: formData.name,
          description: formData.description,
          source_type: formData.source_type,
          retention_in_days: formData.retention_in_days,
        },
      ],
    };
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.put(
      `${process.env.SNAPCHAT_API}/adaccounts/${accountAdId}/segments`,
      data,
      config
    );
    // Send the response from Snapchat API back to the client
    res.send(response.data);
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error:", error.response.data);
    res.status(error.response.status).json({ message: error.response.data });
  }
};

//add users to segment
export const addSegmentUsers = async (req, res) => {
  const segmentId = req.params.segment_id;
  const accessToken = req.headers["snap-access-token"];
  const formData = req.body;

  try {
    const data = {
      users: [
        {
          schema: [formData.schema],
          data: formData.data,
        },
      ],
    };
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${process.env.SNAPCHAT_API}/segments/${segmentId}/users`,
      data,
      config
    );
    res.send(response.data);
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error:", error.response.data);
    res.status(error.response.status).json({ message: error.response.data });
  }
};
