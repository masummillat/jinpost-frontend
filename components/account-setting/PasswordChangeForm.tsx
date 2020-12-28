import React from 'react';

const PasswordChangeForm = () => {

    return(
        <form>
            <div className="form-group">
                <label>Old Password</label>
                <input type="password" className="form-control" placeholder="Type current password" />
            </div>
            <div className="form-group">
                <label>New Password</label>
                <input type="password" className="form-control" placeholder="Type new password" />
            </div>
            <div className="form-group">
                <label>Confirmed Password</label>
                <input type="password" className="form-control" placeholder="Retype new password" />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
        </form>
    );
}

export default PasswordChangeForm;
