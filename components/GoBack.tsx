import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import Link from 'next/link'
import { NextPage } from 'next';

interface Props {
    path: string;
}

const GoBack: NextPage<Props> = (props) => {
    const path = props.path
    return (
        <Link href={path}>
            <a>
                <FontAwesomeIcon icon={ faArrowLeft }/> Back
            </a>
        </Link>
    )
}

export default GoBack