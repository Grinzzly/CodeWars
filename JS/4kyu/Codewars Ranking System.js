function User() {
    this.rank = -8;
    this.progress = 0;
    this.HUNDRED = 100;
    this.HIGHEST = 8;
}

User.prototype.incProgress = function(rank) {
    if (rank == 0 || rank > this.HIGHEST || rank < -this.HIGHEST) throw new RangeError("rank input out of range");
    if (this.rank == this.HIGHEST) return;

    var diff = (rank > 0 && this.rank < 0) || (rank < 0 && this.rank > 0) ? Math.abs(this.rank) + Math.abs(rank) : rank - this.rank;
    if (rank > 0 && this.rank < 0) diff--;
    if (rank < 0 && this.rank > 0) diff = -diff;
    if (diff > 0) {
        this.progress += (rank == 1 && this.rank == -1) ? 10 : (10 * diff * diff);
    } else {
        this.progress += diff == 0 ? 3 : 1;
    }

    if (this.progress > this.HUNDRED && this.rank < this.HIGHEST) {
        this.rank += Math.floor(this.progress / this.HUNDRED);
        if (this.rank == 0) this.rank++;
        this.progress %= this.HUNDRED;
    }
    if (this.rank == this.HIGHEST) this.progress = 0;

    console.log("current rank = " + this.rank + "; progress = " + this.progress);
    return diff;
};