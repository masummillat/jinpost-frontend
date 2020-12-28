import React from "react";

const AuthorCard: React.FC<any> = ({author}) => {

    return(
            <div className="author-item">
                <div className="card">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src={author.profileImage} className="card-img" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{author.name}</h5>
                                <p className="card-text">{author.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default AuthorCard;
