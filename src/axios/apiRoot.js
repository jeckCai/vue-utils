const hostname = window.location.hostname,
    env = 'dev/';
let domain = window.location.origin + '/';

const localhost = [
    'localhost',
    '0.0.0.0',
    '192.168.2.169',
    '192.168.1.24',
];

if (localhost.includes(hostname)) {
    domain += env;
}

export default domain;
