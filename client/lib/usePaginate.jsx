import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../state/ducks/messages";

export const usePaginate = () => {
  const { cursor } = useSelector((state) => state.messages);
  const [load, setLoading] = useState(false);
  const {
    currentChannel: { shortid },
  } = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  useEffect(() => {
    const element = document.getElementById("chat");
    const handleScroll = async () => {
      if (element.scrollTop > 200 || !cursor || load) {
        return;
      }
      setLoading(true);
      await dispatch(
        fetchMessages(
          `/api/channels/${shortid}/messages?cursor=${cursor}`,
          "GET",
          "PAGINATE",
          null
        )
      );
      setLoading(false);
    };
    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  });
};
