import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Post from "./Post";
import { getTimelinePosts } from '../../redux/actions/post.js';

function Posts() {
    const dispatch = useDispatch();
    const params = useParams();
    const { user } = useSelector(state => state.authReducer.authData);
    let { posts, loading } = useSelector(state => state.postReducer);

    useEffect(() => {
        dispatch(getTimelinePosts(user._id));
    }, [dispatch, user._id]);

    if (loading) return <div>Fetching posts...</div>;

    if (!posts || posts.length === 0) return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>No posts</div>;

    if (params.id) posts = posts.filter(post => post.userId === params.id);

    return (
        <div className="flex flex-col gap-4">
            {posts.map(post => (
                <Post key={post._id} data={post} />
            ))}
        </div>
    );
}

export default Posts;
