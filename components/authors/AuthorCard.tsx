import React from "react";
import Link from "next/link";
import { UserDto } from "../../types";

interface AuthorCardProps{
    author: UserDto
}
const AuthorCard: React.FC<AuthorCardProps> = ({author}) => {

    return(
            <div className="author-item">
                <div className="card">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src={author.profileImage ? author.profileImage : 'static/img/profile.jpg'} className="card-img" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <Link href={`/${author.domain}`}>
                                    <a>
                                        <h5 className="card-title">{author.name}</h5>
                                    </a>
                                </Link>
                                <p className="card-text text-justify text-nowrap text-truncate">{author.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default AuthorCard;
