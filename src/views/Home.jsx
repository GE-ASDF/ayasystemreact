import PropTypes from 'prop-types';

export default function Home(props){
    return (
        <>
            <h1>{props.title}</h1>
            <h1>{props.children}</h1>
        </>
    )
}

Home.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
}