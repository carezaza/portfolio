import Layout from "../../../components/layout";
import Header from "../../../components/portfolio/header";
import Landing from "../../../components/portfolio/landing";
import Projects from "../../../components/portfolio/projects";
import About from "../../../components/portfolio/about";
import Resume from "../../../components/portfolio/resume";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "../../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { setPort } from "../../../redux/port/slice";

function Port() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { port } = useSelector((state) => state.portReducer);
  const { user } = useSelector((state) => state.userReducer);
  const [offset, setOffset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allowEdit, setAllowEdit] = useState(false);

  const ProjectsRef = useRef(null);
  const AboutRef = useRef(null);
  const ResumeRef = useRef(null);

  useEffect(() => {
    if (ProjectsRef && AboutRef && ResumeRef && !loading) {
      setOffset({
        projects: ProjectsRef.current.offsetTop,
        about: AboutRef.current.offsetTop,
        resume: ResumeRef.current.offsetTop,
      });
    }
  }, [loading]);

  useEffect(() => {
    const fetchPort = async () => {
      if (router.query.id) {
        try {
          const res = await axios.get(`/api/portfolio/who/${router.query.id}`);
          dispatch(setPort(res.data));
          if (user) {
            if (user._id === res.data.user) {
              setAllowEdit(true);
            }
          }
          setLoading(false);
        } catch (error) {
          router.push("/");
        }
      }
    };
    fetchPort();

    return function () {
      dispatch(setPort(null));
    };
  }, [router.query.id, user]);

  if (loading) return <Spinner />;
  return (
    port && (
      <Layout title={`Portfolio of ...`}>
        <Header offset={offset} />
        <Landing port={port} allowEdit={allowEdit} />
        <div ref={ProjectsRef}>
          <Projects projects={port.projects} allowEdit={allowEdit} />
        </div>
        <div ref={AboutRef}>
          <About about={port.about} allowEdit={allowEdit} />
        </div>
        <div ref={ResumeRef}>
          <Resume resumeURL={port.resume} allowEdit={allowEdit} />
        </div>
      </Layout>
    )
  );
}

export default Port;
