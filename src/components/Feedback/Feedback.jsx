import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, Grid } from "@mui/material";
import Rating from "@mui/material/Rating";
import { FaStar } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useParams } from "react-router-dom";
import * as feedbackService from "../../services/feedback";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbackThunk } from "../../redux/slices/feedback";
import moment from "moment";

const Feedback = () => {
    const accessToken = localStorage.getItem("access-token");
    const auth = localStorage.getItem("auth");
    const authObject = auth ? JSON.parse(auth) : null;
    const userId = authObject ? authObject.id : null;
    const userIdString = userId ? String(userId) : "";
    const [change, setChange] = useState(true);
    const dispatch = useDispatch();

    const { productAuctionId } = useParams();
    const [form, setForm] = useState({
        rating: 1,
        message: "",
        userId: userIdString,
        productAuctionId: productAuctionId,
        createdAt: new Date(),
    });

    const { list } = useSelector((state) => state.feedback);

    const [idFeedback, setIdFeedback] = useState("");

    useEffect(() => {
        dispatch(
            fetchFeedbackThunk({ accessToken, productAuctionId, userIdString })
        );
    }, [productAuctionId]);

    const handleToggleOptions = (item) => {
        setIdFeedback(item?.id);
        // setShowOptions(!showOptions);
    };

    const handleChangeMessage = (e) => {
        setForm((prevForm) => ({
            ...prevForm,
            message: e.target.value,
        }));
    };

    const handleChangeRating = (e) => {
        console.log(e.target.value);
        setForm((prevForm) => ({
            ...prevForm,
            rating: e.target.value,
        }));
    };
    const handleSubmit = () => {
        console.log(idFeedback, "idFeedback");
        if (idFeedback !== "") {
            const body = {
                message: form.message,
                rating: form.rating,
            };
            feedbackService
                .updateFeedback(accessToken, idFeedback, body)
                .then((res) => {
                    dispatch(
                        fetchFeedbackThunk({
                            accessToken,
                            productAuctionId,
                            userIdString,
                        })
                    );
                    toast.success(`${res.response.message}`);
                    setForm((prevForm) => ({
                        ...prevForm,
                        message: "",
                        rating: 1,
                    }));
                    setIdFeedback("");
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            feedbackService
                .createFeedback(accessToken, form)
                .then((res) => {
                    dispatch(
                        fetchFeedbackThunk({
                            accessToken,
                            productAuctionId,
                            userIdString,
                        })
                    );
                    toast.success(`${res.response.message}`);
                    setForm((prevForm) => ({
                        ...prevForm,
                        message: "",
                        rating: 1,
                    }));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
       
    };

    const handleCancel = () => {
        setForm((prevForm) => ({
            ...prevForm,
            message: "",
            rating: 1,
        }));
    };

    const RatingComponent = (rating) => {
        const ratingArray = Array.from({ length: rating }, (v, k) => k + 1);
        return (
            <div className="flex space-x-1 mt-1">
                {ratingArray.map((num) => (
                    <FaStar key={num} className="w-4 fill-[#facc15]" />
                ))}
            </div>
        );
    };

    const onClickDelete = (id) => {
        feedbackService
            .deleteFeedback(accessToken, id)
            .then((res) => {
                dispatch(
                    fetchFeedbackThunk({
                        accessToken,
                        productAuctionId,
                        userIdString,
                    })
                );
                toast.success("Successfully Deleted Feedback");
            })
            .catch((err) => {
                console.log(err);
            });
          
    };

    const onClickUpdate = (item) => {
        setForm((prevForm) => ({
            ...prevForm,
            message: item.message,
            rating: item.rating,
        }));
     
    };

    return (
        <div className="max-w-2xl mx-auto  p-6 text-[#333] font-[sans-serif] rounded-md border border-[#333]">
            <div className="flex flex-col items-center">
                <h2 className="mb-2 font-bold text-xl">Session Reviews</h2>
                <span className="mb-4">Please rate your experience below</span>
            </div>
            <Box
                component="form"
                sx={{
                    "& > legend": { mt: 2 },
                    "& .MuiRating-iconFilled": {
                        color: "#facc15",
                    },
                }}
                onSubmit={(e) => {
                    e.preventDefault();
                    // Xử lý việc gửi form feedback
                }}
            >
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Rating
                        name="simple-controlled"
                        value={form.rating}
                        onChange={handleChangeRating}
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            fontSize: "2rem", // Kích thước phù hợp với yêu cầu của bạn
                        }}
                    />
                </div>
                <TextField
                    id="review"
                    label="Review"
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
                    onChange={handleChangeMessage}
                    value={form.message}
                />
                <Grid
                    container
                    spacing={2}
                    sx={{ mt: 2, justifyContent: "flex-end" }}
                >
                    <Grid item xs={3}>
                        <button
                            onClick={handleCancel}
                            type="button"
                            className="px-6 py-2.5 text-sm font-semibold text-black border border-gray-400 rounded hover:bg-gray-200 mr-4 w-full"
                        >
                            Cancel
                        </button>
                    </Grid>
                    <Grid item xs={3}>
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="px-8 py-2.5 text-sm font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                        >
                            Submit
                        </button>
                    </Grid>
                </Grid>
            </Box>
            <div className="mt-2 ">
                <h3 className="font-bold text-base">
                    All Reviews {`(${list.length || 0})`}
                </h3>
                <div className="mt-6 space-y-4 max-h-56 overflow-auto">
                    {list.length > 0
                        ? list.map((item, index) => {
                              return (
                                  <div className="flex items-start justify-between">
                                      <div className="flex">
                                          <img
                                              alt=""
                                              src={
                                                  item?.user?.avatar_url ||
                                                  "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                                              }
                                              className="w-12 h-12 rounded-full border-2 border-white"
                                          />
                                          <div className="ml-3">
                                              <h4 className="text-sm font-bold">
                                                  {item?.user?.full_name}
                                              </h4>
                                              {RatingComponent(item.rating)}
                                              <p className="text-xs mt-2 font-semibold">
                                                  {moment(
                                                      item.createdAt
                                                  ).format("YYYY-MM-DD HH:mm")}
                                              </p>
                                              <p className="text-xs mt-2">
                                                  {item?.message}
                                              </p>
                                          </div>
                                      </div>
                                      <div className="flex  mt-1 relative">
                                          {userIdString === item.userId && (
                                              <button
                                                  type="button"
                                                  onClick={() =>
                                                      handleToggleOptions(item)
                                                  }
                                                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                              >
                                                  <BsThreeDotsVertical />
                                              </button>
                                          )}

                                          {item.id === idFeedback && (
                                              <div className="absolute top-0 mt-6">
                                                  <div className="ml-[-30px]">
                                                      <button
                                                          onClick={() =>
                                                              onClickUpdate(
                                                                  item
                                                              )
                                                          }
                                                          className="text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none "
                                                      >
                                                          Edit
                                                      </button>
                                                      <button
                                                          onClick={() =>
                                                              onClickDelete(
                                                                  item.id
                                                              )
                                                          }
                                                          className="text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none "
                                                      >
                                                          Delete
                                                      </button>
                                                  </div>
                                              </div>
                                          )}
                                      </div>
                                  </div>
                              );
                          })
                        : ""}
                </div>
            </div>
        </div>
    );
};
export default Feedback;
