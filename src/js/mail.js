const mailTo = (emailAddress, emailSubject) => {
    let mailtoLink = `mailto:${emailAddress}`;

    if (emailSubject) {
        mailtoLink += `?subject=${encodeURIComponent(emailSubject)}`;
    }

    window.location.href = mailtoLink;
}

const mail = {
    mailTo: mailTo
}

export default mail;