export class ProfileModel{
    constructor(firstName, lastName, email, phoneNumber, emailPreferences, profilePicture){
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.phoneNumber = phoneNumber
        this.emailPreferences = emailPreferences
        this.profilePicture = profilePicture
    }
}

export class ProfileEmailPreferences{
    constructor(orderStatus, pwChanges, offers, newsletter){
        this.orderStatus = orderStatus;
        this.pwChanges = pwChanges;
        this.offers = offers;
        this.newsletter = newsletter;
    }
}