import React from "react";

const AuthorCard = ({author}:{author: object}) => {

    return(
            <div className="author-item">
                <div className="card">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src="/static/img/profile.jpg" className="card-img" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{author.name}</h5>
                                <p className="card-text">This is a wider card with supporting text below as a
                                    natural lead-in to</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default AuthorCard;
